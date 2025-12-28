import fs from "fs";
import File from "../models/File.js";

/* ================= SEND FILE ================= */
export const sendFile = async (req, res) => {
    console.log("REQ FILE:", req.file); 
  try {
    
    
    if (!req.file) {
      return res.status(400).json({ message: "File missing" });
    }

    const code = Math.floor(1000 + Math.random() * 9000).toString();

  await File.create({
  code,
  path: req.file.path,
  originalName: req.file.originalname,
  mimeType: req.file.mimetype,
  expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  senderId: req.user ? req.user.id : null
});


    res.status(201).json({ code });

  } catch (err) {
     console.error("UPLOAD ERROR BACKEND:", err); 
    res.status(500).json({ message: "Upload failed" });
  }
};

/* ================= RECEIVE FILE ================= */
export const receiveFile = async (req, res) => {
  try {
    const { code } = req.body;

    const fileData = await File.findOne({ code });
    if (!fileData) {
      return res.status(404).json({ message: "Invalid or expired code" });
    }

   
    if (req.user && !fileData.receiverId) {
      fileData.receiverId = req.user.id;
      await fileData.save();
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(fileData.originalName)}"`
    );

    res.setHeader("Content-Type", fileData.mimeType);

    res.sendFile(fileData.path, { root: "." });

  } catch (error) {
    console.error("RECEIVE ERROR:", error);
    res.status(500).json({ message: "Download failed" });
  }
};


/* ================= HISTORY ================= */
export const getMyFiles = async (req, res) => {
  try {
    const userId = req.user.id;

    const files = await File.find({
      $or: [
        { senderId: userId },
        { receiverId: userId }
      ]
    })
      .sort({ createdAt: -1 })
      .select("originalName code senderId receiverId createdAt");

    res.json(files);

  } catch (err) {
    res.status(500).json({ message: "History fetch failed" });
  }
};
