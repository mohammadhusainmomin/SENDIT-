import User from "../models/User.js";
import FileHistory from "../models/FileHistory.js";
import CodeHistory from "../models/CodeHistory.js";
import Code from "../models/Code.js";
import File from "../models/File.js";
import DropRoom from "../models/DropRoom.js";
import DropSubmission from "../models/DropSubmission.js";
import jwt from "jsonwebtoken";

// Read admin config at request time so dotenv has been initialized by app.js.
const getAdminConfig = () => ({
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  jwtSecret: process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET,
});

export const verifyAdmin = (req, res) => {
  const { email, password } = req.body || {};
  const adminConfig = getAdminConfig();

  if (!adminConfig.email || !adminConfig.password || !adminConfig.jwtSecret) {
    return res.status(503).json({ success: false, message: "Admin authentication is not configured" });
  }

  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const configuredEmail = adminConfig.email.trim().toLowerCase();
  if (normalizedEmail === configuredEmail && password === adminConfig.password) {
    const token = jwt.sign(
      { email: adminConfig.email, scope: "admin" },
      adminConfig.jwtSecret,
      { expiresIn: "8h" },
    );
    return res.json({
      success: true,
      message: "Admin verified",
      admin: configuredEmail,
      token,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid admin credentials"
  });
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalFiles = await FileHistory.countDocuments();
    const totalCodes = await CodeHistory.countDocuments();

    const filesSent = await FileHistory.countDocuments();
    const filesReceived = await FileHistory.countDocuments({ status: "received" });
    const expiredFiles = await FileHistory.countDocuments({ isExpired: true });

    const codesSent = await CodeHistory.countDocuments();
    const codesReceived = await CodeHistory.countDocuments({ status: "received" });
    const expiredCodes = await CodeHistory.countDocuments({ isExpired: true });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentFiles = await FileHistory.countDocuments({
      sentAt: { $gte: thirtyDaysAgo }
    });

    const recentCodes = await CodeHistory.countDocuments({
      sentAt: { $gte: thirtyDaysAgo }
    });

    const recentUsers = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });

    const localAuth = await User.countDocuments({ authProvider: "local" });
    const googleAuth = await User.countDocuments({ authProvider: "google" });

    return res.json({
      success: true,
      stats: {
        totalUsers,
        totalFiles,
        totalCodes,
        filesSent,
        filesReceived,
        expiredFiles,
        codesSent,
        codesReceived,
        expiredCodes,
        recentFiles,
        recentCodes,
        recentUsers,
        authBreakdown: {
          local: localAuth,
          google: googleAuth
        }
      }
    });

  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching statistics"
    });
  }
};

export const getMonthlyTrend = async (req, res) => {
  try {
    const monthlyData = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
      const startDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const endDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);

      const files = await FileHistory.countDocuments({
        sentAt: { $gte: startDate, $lt: endDate },
      });

      const codes = await CodeHistory.countDocuments({
        sentAt: { $gte: startDate, $lt: endDate },
      });

      monthlyData.push({
        month: startDate.toLocaleString("default", { month: "short" }),
        files,
        codes,
        total: files + codes,
      });
    }

    return res.json({
      success: true,
      data: monthlyData,
    });
  } catch (error) {
    console.error("Error fetching monthly trend:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching monthly trend",
    });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const fetchCount = page * limit;
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Pull enough rows from each collection so merged pagination stays correct.
    const [totalFiles, totalCodes, recentFiles, recentCodes] = await Promise.all([
      FileHistory.countDocuments({ sentAt: { $gte: oneDayAgo } }),
      CodeHistory.countDocuments({ sentAt: { $gte: oneDayAgo } }),
      FileHistory.find()
        .where("sentAt")
        .gte(oneDayAgo)
        .sort({ sentAt: -1 })
        .limit(fetchCount)
        .lean(),
      CodeHistory.find()
        .where("sentAt")
        .gte(oneDayAgo)
        .sort({ sentAt: -1 })
        .limit(fetchCount)
        .lean(),
    ]);

    const total = totalFiles + totalCodes;
    const pages = Math.max(1, Math.ceil(total / limit));

    // File history
    const filesActivity = recentFiles.map((file) => {
      const resolvedStatus =
        file.status === "pending" &&
        (file.receivedAt || file.receiverName || file.receiverEmail)
          ? "received"
          : file.status;

      const senderLabel = file.senderName || file.senderEmail || "Guest User";
      const receiverLabel =
        file.receiverName ||
        file.receiverEmail ||
        (file.receiverType === "guest" && resolvedStatus === "received"
          ? "Guest User"
          : "Not received");

      return {
        type: "file",
        id: file._id,
        code: file.code,
        fileName: file.originalName,
        sender: senderLabel,
        senderName: senderLabel,
        receiver: receiverLabel,
        receiverName: receiverLabel,
        status: resolvedStatus,
        isExpired: file.isExpired,
        isDeleted: file.isFileDeleted,
        date: file.sentAt,
      };
    });

    // Code history
    const codesActivity = recentCodes.map((code) => {
      const resolvedStatus =
        code.status === "pending" &&
        (code.receivedAt || code.receiverName || code.receiverEmail)
          ? "received"
          : code.status;

      const senderLabel = code.senderName || code.senderEmail || "Guest User";
      const receiverLabel =
        code.receiverName ||
        code.receiverEmail ||
        (code.receiverType === "guest" && resolvedStatus === "received"
          ? "Guest User"
          : "Not received");

      return {
        type: "code",
        id: code._id,
        code: code.code,
        sender: senderLabel,
        senderName: senderLabel,
        receiver: receiverLabel,
        receiverName: receiverLabel,
        status: resolvedStatus,
        isExpired: code.isExpired,
        isDeleted: code.isContentDeleted,
        date: code.sentAt,
      };
    });

    const allActivity = [...filesActivity, ...codesActivity]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(skip, skip + limit);

    return res.json({
      success: true,
      activity: allActivity,
      pagination: {
        total,
        page,
        pages,
        limit,
        hasMore: page < pages,
      },
    });

  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching recent activity"
    });
  }
};

export const getUsersList = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const total = await User.countDocuments();
    const pages = Math.max(1, Math.ceil(total / limit));

    const users = await User.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("name email authProvider createdAt")
      .lean();

    const usersWithStats = await Promise.all(
      users.map(async (user) => {
        const filesSent = await FileHistory.countDocuments({
          senderId: user._id,
        });

        const filesReceived = await FileHistory.countDocuments({
          receiverId: user._id,
        });

        const codesSent = await CodeHistory.countDocuments({
          senderId: user._id,
        });

        const codesReceived = await CodeHistory.countDocuments({
          receiverId: user._id,
        });

        return {
          ...user,
          stats: {
            filesSent,
            filesReceived,
            codesSent,
            codesReceived,
          },
        };
      })
    );

    return res.json({
      success: true,
      users: usersWithStats,
      pagination: {
        total,
        page,
        pages,
        limit,
        hasMore: page < pages,
      },
    });
  } catch (error) {
    console.error("Error fetching users list:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
};

const getDropRoomStatus = (room) => {
  if (room.isClosed) return "closed";
  if (new Date(room.expiresAt).getTime() <= Date.now()) return "expired";
  return "open";
};

export const getAdminDropRooms = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    const total = await DropRoom.countDocuments();
    const pages = Math.max(1, Math.ceil(total / limit));

    const rooms = await DropRoom.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const counts = await DropSubmission.aggregate([
      {
        $match: {
          roomId: { $in: rooms.map((room) => room._id) },
          isDeleted: { $ne: true },
        },
      },
      { $group: { _id: "$roomId", submissionsCount: { $sum: 1 }, filesCount: { $sum: { $size: "$files" } } } },
    ]);

    const countMap = new Map(counts.map((item) => [String(item._id), item]));
    const formatted = rooms.map((room) => {
      const roomCounts = countMap.get(String(room._id));

      return {
        _id: room._id,
        code: room.code,
        title: room.title,
        organizerName: room.organizerName || "Unknown",
        organizerEmail: room.organizerEmail || "Unknown",
        requiredFilesCount: room.requiredFiles?.length || 0,
        submissionsCount: roomCounts?.submissionsCount || 0,
        filesCount: roomCounts?.filesCount || 0,
        maxFileSizeMB: room.maxFileSizeMB,
        status: getDropRoomStatus(room),
        createdAt: room.createdAt,
        expiresAt: room.expiresAt,
      };
    });

    return res.json({
      success: true,
      rooms: formatted,
      pagination: {
        total,
        page,
        pages,
        limit,
        hasMore: page < pages,
      },
    });
  } catch (error) {
    console.error("Error fetching admin drop rooms:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching drop rooms",
    });
  }
};

export const getFileDetails = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const history = await FileHistory.find()
      .sort({ sentAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const formatted = history.map(file => ({
      _id: file._id,
      code: file.code,
      fileName: file.originalName,
      mimeType: file.mimeType,

      senderName: file.senderName || "Guest",
      senderEmail: file.senderEmail || "Guest",
      senderType: file.senderType,

      receiverName: file.receiverName || "Not received",
      receiverEmail: file.receiverEmail || "Not received",
      receiverType: file.receiverType || "guest",

      status: file.status,
      isExpired: file.isExpired,
      isFileDeleted: file.isFileDeleted,

      sentAt: file.sentAt,
      receivedAt: file.receivedAt,
      deletedAt: file.deletedAt,
      expiresAt: file.expiresAt
    }));

    return res.json({
      success: true,
      files: formatted,
      total: await FileHistory.countDocuments()
    });

  } catch (error) {
    console.error("Error fetching file history:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching file history"
    });
  }
};

export const getCodeDetails = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const history = await CodeHistory.find()
      .sort({ sentAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const formatted = history.map((code) => ({
      _id: code._id,
      code: code.code,

      senderName: code.senderName || "Guest",
      senderEmail: code.senderEmail || "Guest",
      senderType: code.senderType,

      receiverName: code.receiverName || "Not received",
      receiverEmail: code.receiverEmail || "Not received",
      receiverType: code.receiverType || "guest",

      status: code.status,
      isExpired: code.isExpired,
      isContentDeleted: code.isContentDeleted,

      sentAt: code.sentAt,
      receivedAt: code.receivedAt,
      deletedAt: code.deletedAt,
      expiresAt: code.expiresAt,
      contentPreview: code.contentPreview,
    }));

    return res.json({
      success: true,
      codes: formatted,
      total: await CodeHistory.countDocuments(),
    });
  } catch (error) {
    console.error("Error fetching code history:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching code history",
    });
  }
};
