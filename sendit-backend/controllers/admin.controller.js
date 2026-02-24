import User from "../models/User.js";
import FileHistory from "../models/FileHistory.js";
import CodeHistory from "../models/CodeHistory.js";
import Code from "../models/Code.js";
import File from "../models/File.js";

// Admin credentials (using environment variables for production)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "senditsystem786@gmail.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sendit123";

export const verifyAdmin = (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({
      success: true,
      message: "Admin verified",
      admin: email
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

    // File history
    const recentFiles = await FileHistory.find()
      .sort({ sentAt: -1 })
      .limit(limit)
      .lean();

    const filesActivity = recentFiles.map(file => ({
      type: "file",
      id: file._id,
      code: file.code,
      fileName: file.originalName,
      sender: file.senderEmail || "Guest",
      senderName: file.senderName || "Guest",
      receiver: file.receiverEmail || "Not received",
      receiverName: file.receiverName || "Not received",
      status: file.status,
      isExpired: file.isExpired,
      isDeleted: file.isFileDeleted,
      date: file.sentAt
    }));

    // Code history
    const recentCodes = await CodeHistory.find()
      .sort({ sentAt: -1 })
      .limit(limit)
      .lean();

    const codesActivity = recentCodes.map(code => ({
      type: "code",
      id: code._id,
      code: code.code,
      sender: code.senderEmail || "Guest",
      senderName: code.senderName || "Guest",
      receiver: code.receiverEmail || "Not received",
      receiverName: code.receiverName || "Not received",
      status: code.status,
      isExpired: code.isExpired,
      isDeleted: code.isContentDeleted,
      date: code.sentAt
    }));

    const allActivity = [...filesActivity, ...codesActivity]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);

    return res.json({
      success: true,
      activity: allActivity
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

    const users = await User.find()
      .sort({ createdAt: -1 })
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
      total: await User.countDocuments(),
    });
  } catch (error) {
    console.error("Error fetching users list:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching users",
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