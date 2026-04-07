import fs from "fs";
import crypto from "crypto";
import File from "../models/File.js";
import FileHistory from "../models/FileHistory.js";
import { encryptFile, decryptFile } from "../utils/encryption.utils.js";
import { generateUniqueCode } from "../utils/codeGenerator.utils.js";

/* ================= SEND FILE ================= */
export const sendFile = async (req, res) => {
  try {
    // Support both single file (req.file) and multiple files (req.files)
    const uploadedFiles = req.files || (req.file ? [req.file] : []);

    if (uploadedFiles.length === 0) {
      return res.status(400).json({ message: "No files provided" });
    }

    const code = await generateUniqueCode();
    const expiresIn = parseInt(req.query.expiresIn) || 10;
    const expiresAt = new Date(Date.now() + expiresIn * 60 * 1000);

    // Encrypt all files and prepare file objects
    const fileObjects = [];

    for (const file of uploadedFiles) {
      const encryptedPath = `uploads/encrypted-${Date.now()}-${crypto.randomUUID()}`;
      await encryptFile(file.path, encryptedPath);

      // Delete the original plaintext file after encryption
      fs.unlink(file.path, (err) => {
        if (err) console.error("Error deleting original file:", err);
      });

      fileObjects.push({
        encryptedPath,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
      });
    }

    // Create file document
    const fileDoc = await File.create({
      code,
      files: fileObjects,
      expiresIn,
      expiresAt,
      senderId: req.user?.id,
    });

    // Create history records for each file
    for (const file of fileObjects) {
      await FileHistory.create({
        fileId: fileDoc._id,
        code,
        originalName: file.originalName,
        mimeType: file.mimeType,

        senderId: req.user?._id || null,
        senderEmail: req.user?.email || null,
        senderName: req.user?.name || "Guest User",
        senderType: req.user ? "authenticated" : "guest",

        sentAt: new Date(),
        expiresAt,
        expiresIn,
        status: "pending",
      });
    }

    res.json({
      code,
      expiresIn,
      expiresAt: expiresAt.toISOString(),
      filesCount: fileObjects.length,
    });
  } catch (err) {
    console.error("SEND FILE ERROR:", err);
    res.status(500).json({ message: "File upload failed" });
  }
};

/* ================= RECEIVE FILE ================= */
export const receiveFile = async (req, res) => {
  try {
    const { code, fileIndex } = req.body;

    const fileBundle = await File.findOne({ code });
    if (!fileBundle) return res.status(404).json({ message: "Invalid code" });

    const expiresAt = fileBundle.expiresAt ? new Date(fileBundle.expiresAt) : null;
    if (expiresAt && Date.now() >= expiresAt.getTime()) {
      return res.status(410).json({ message: "Code expired" });
    }

    // If no specific file requested, return metadata of all files
    if (fileIndex === undefined) {
      return res.json({
        filesCount: fileBundle.files.length,
        expiresAt: expiresAt?.toISOString() || null,
        files: fileBundle.files.map((f, idx) => ({
          index: idx,
          name: f.originalName,
          mimeType: f.mimeType,
          size: f.size,
        })),
      });
    }

    // Get specific file
    const file = fileBundle.files[fileIndex];
    if (!file) return res.status(404).json({ message: "File not found" });

    // Record receiverId if user is authenticated
    const isFirstReceive = !fileBundle.receiverId;
    if (isFirstReceive && req.user) {
      fileBundle.receiverId = req.user.id;
      await fileBundle.save();
    }

    // Update history for both authenticated and guest receivers.
    const receiverUpdate = req.user
      ? {
          receiverId: req.user.id,
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

    await FileHistory.updateMany({ fileId: fileBundle._id }, receiverUpdate);

    const decryptedPath = `uploads/tmp-${Date.now()}-${crypto.randomUUID()}`;
    await decryptFile(file.encryptedPath, decryptedPath);

    res.setHeader("X-Filename", encodeURIComponent(file.originalName));
    res.type(file.mimeType);
    res.download(decryptedPath, file.originalName, (err) => {
      if (err) {
        console.error("DOWNLOAD ERROR:", err);
        if (!res.headersSent) {
          res.status(500).json({ message: "File download failed" });
        }
      }
      // Delete the temporary decrypted file
      fs.unlink(decryptedPath, (err) => {
        if (err) console.error("Error deleting temp file:", err);
      });
    });
  } catch (err) {
    console.error("RECEIVE ERROR:", {
      message: err.message,
      stack: err.stack,
      code: req.body?.code,
      fileIndex: req.body?.fileIndex,
    });
    if (!res.headersSent) {
      res.status(500).json({ message: "An error occurred during file retrieval" });
    }
  }
};



/* ================= FILE HISTORY ================= */
export const getSentFilesHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const history = await FileHistory.find({
      senderId: userId
    })
      .sort({ sentAt: -1 })
      .select(
        "code originalName mimeType receiverName receiverEmail receiverType sentAt status"
      );

    res.json({
      success: true,
      type: "sent",
      history
    });

  } catch (err) {
    console.error("GET SENT FILES ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sent files"
    });
  }
};

export const getReceivedFilesHistory = async (req, res) => {
  try {
    const userId = req.user._id;

    const history = await FileHistory.find({
      receiverId: userId
    })
      .sort({ receivedAt: -1 })
      .select(
        "code originalName mimeType senderName senderEmail senderType sentAt receivedAt status"
      );

    res.json({
      success: true,
      type: "received",
      history
    });

  } catch (err) {
    console.error("GET RECEIVED FILES ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch received files"
    });
  }
};

/* ================= ADMIN FILE HISTORY ================= */
export const getAdminFileHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const history = await FileHistory.find()
      .sort({ sentAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-fileId");

    const total = await FileHistory.countDocuments();

    res.json({
      success: true,
      history,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (err) {
    console.error("GET ADMIN FILE HISTORY ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch file history",
    });
  }
};
