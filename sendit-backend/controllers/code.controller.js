import Code from "../models/Code.js";
import CodeHistory from "../models/CodeHistory.js";
import { encryptText, decryptText } from "../utils/encryption.utils.js";
import { generateUniqueCode } from "../utils/codeGenerator.utils.js";

/* ================= SEND CODE ================= */
export const sendCode = async (req, res) => {
  try {
    const { content, expiresIn } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Code is required" });
    }

    const shareCode = await generateUniqueCode();
    const expirationTime = parseInt(expiresIn) || 10;
    const expiresAtTime = new Date(Date.now() + expirationTime * 60 * 1000);

    const encryptedContent = encryptText(content);


    const senderId = req.user?._id || null;
    const senderEmail = req.user?.email || null;
    const senderName = req.user?.name || "Guest User";
    const senderType = req.user ? "authenticated" : "guest";

    const codeDoc = await Code.create({
      code: shareCode,
      content: encryptedContent,
      expiresIn: expirationTime,
      expiresAt: expiresAtTime,
      senderId
    });

    const contentPreview =
      content.length > 100 ? content.substring(0, 100) + "..." : content;

    await CodeHistory.create({
      codeId: codeDoc._id,
      code: shareCode,
      contentPreview,

      senderId,
      senderEmail,
      senderName,
      senderType,

      sentAt: new Date(),
      expiresAt: expiresAtTime,
      expiresIn: expirationTime,
      status: "pending"
    });

    res.json({ code: shareCode, expiresIn: expirationTime });

  } catch (err) {
    console.error("SEND CODE ERROR:", err);
    res.status(500).json({ message: "Failed to send code" });
  }
};

/* ================= RECEIVE CODE ================= */
export const receiveCode = async (req, res) => {
  try {
    const { code } = req.body;

    const data = await Code.findOne({ code });
    if (!data) {
      return res.status(404).json({ message: "Invalid code" });
    }

    if (new Date() > data.expiresAt) {
      return res.status(410).json({ message: "Code expired" });
    }

    // Decrypt the code content
    const decryptedContent = decryptText(data.content);

    // Record receiverId if user is authenticated and no receiver yet
    if (!data.receiverId && req.user) {
      data.receiverId = req.user._id;
      await data.save();
    }

    // Update history for both authenticated and guest receivers.
    const receiverUpdate = req.user
      ? {
          receiverId: req.user._id,
          receiverEmail: req.user.email,
          receiverName: req.user.name,
          receiverType: "authenticated",
          receivedAt: new Date(),
          status: "received",
        }
      : {
          receiverName: "Guest User",
          receiverType: "guest",
          receivedAt: new Date(),
          status: "received",
        };

    await CodeHistory.updateMany(
      {
        $and: [
          { $or: [{ codeId: data._id }, { code }] },
          { $or: [{ receivedAt: { $exists: false } }, { receivedAt: null }] },
        ],
      },
      receiverUpdate
    );

    res.json({ content: decryptedContent });

  } catch (err) {
    console.error("RECEIVE CODE ERROR:", err);
    res.status(500).json({ message: "Failed to receive code" });
  }
};


/* ================= CODE HISTORY ================= */
export const getSentCodesHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const history = await CodeHistory.find({
      senderId: userId
    })
      .sort({ sentAt: -1 })
      .select(
        "code contentPreview receiverName receiverEmail receiverType sentAt status"
      );

    res.json({
      success: true,
      type: "sent",
      history
    });

  } catch (err) {
    console.error("GET SENT CODES ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sent codes"
    });
  }
};

export const getReceivedCodesHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const history = await CodeHistory.find({
      receiverId: userId
    })
      .sort({ receivedAt: -1 })
      .select(
        "code contentPreview senderName senderEmail senderType sentAt receivedAt status"
      );

    res.json({
      success: true,
      type: "received",
      history
    });

  } catch (err) {
    console.error("GET RECEIVED CODES ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch received codes"
    });
  }
};

/* ================= ADMIN CODE HISTORY ================= */
export const getAdminCodeHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const history = await CodeHistory.find()
      .sort({ sentAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-codeId");

    const total = await CodeHistory.countDocuments();

    res.json({
      success: true,
      history,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (err) {
    console.error("GET ADMIN CODE HISTORY ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch code history"
    });
  }
};
