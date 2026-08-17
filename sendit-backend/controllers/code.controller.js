import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import Code from "../models/Code.js";
import CodeHistory from "../models/CodeHistory.js";
import { encryptText, decryptText } from "../utils/encryption.utils.js";
import { generateUniqueCode } from "../utils/codeGenerator.utils.js";
import { resolveExpiryWindow } from "../utils/expiry.utils.js";

const execFileAsync = promisify(execFile);

const repairPythonIndentation = (content) => {
  const lines = content.split(/\r?\n/);
  const repaired = [];
  let indentLevel = 0;
  const blockKeywords = /^(?:async\s+def|def|class|if|elif|else|for|while|try|except|finally|with|match|case)\b/;
  const inlineBlockKeywords = /^(?:if|for|while|with|try|except|finally|def|class|elif|else)\b/;

  for (const rawLine of lines) {
    const trimmed = rawLine.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      repaired.push(rawLine);
      continue;
    }

    const startsWithClause = /^(?:elif|else|except|finally)\b/.test(trimmed);

    if (startsWithClause && indentLevel > 0) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    const indent = " ".repeat(indentLevel * 4);
    repaired.push(`${indent}${trimmed}`);

    const isBlockStarter = trimmed.endsWith(":") && (blockKeywords.test(trimmed) || inlineBlockKeywords.test(trimmed));
    if (isBlockStarter) {
      indentLevel += 1;
    }
  }

  return repaired.join("\n");
};

export const formatCodeForLanguage = async (req, res) => {
  try {
    const { content, language } = req.body;

    if (!content || typeof content !== "string") {
      return res.status(400).json({ message: "Code content is required" });
    }

    const normalizedLanguage = (language || "auto-detect").toLowerCase();

    if (normalizedLanguage !== "python") {
      return res.json({ formattedContent: content, language: normalizedLanguage });
    }

    const repairedContent = repairPythonIndentation(content);
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "sendit-python-"));
    const tempFile = path.join(tempDir, "snippet.py");

    await fs.writeFile(tempFile, repairedContent, "utf8");

    try {
      await execFileAsync("python", ["-m", "black", "--quiet", tempFile], {
        cwd: tempDir,
      });

      const formattedContent = await fs.readFile(tempFile, "utf8");
      return res.json({ formattedContent, language: "python" });
    } catch (error) {
      const message = error?.stderr || error?.message || "Python formatting failed";
      return res.status(500).json({
        message: "Python formatting is unavailable on the server.",
        details: message,
      });
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true });
    }
  } catch (error) {
    console.error("FORMAT CODE ERROR:", error);
    res.status(500).json({ message: "Failed to format code" });
  }
};

/* ================= SEND CODE ================= */
export const sendCode = async (req, res) => {
  try {
    const { content, expiresIn, language } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Code is required" });
    }

    const shareCode = await generateUniqueCode();
    const {
      expiresIn: expirationTime,
      expiresAt: expiresAtTime,
      error: expiryError,
    } = resolveExpiryWindow(expiresIn);

    if (expiryError) {
      return res.status(400).json({ message: expiryError });
    }

    const encryptedContent = encryptText(content);

    const senderId = req.user?._id || null;
    const senderEmail = req.user?.email || null;
    const senderName = req.user?.name || "Guest User";
    const senderType = req.user ? "authenticated" : "guest";

    // Normalize and validate language
    const normalizedLanguage = language && language !== "auto-detect" 
      ? language.toLowerCase() 
      : "auto-detect";

    const codeDoc = await Code.create({
      code: shareCode,
      content: encryptedContent,
      language: normalizedLanguage,
      expiresIn: expirationTime,
      expiresAt: expiresAtTime,
      senderId
    });

    await CodeHistory.create({
      codeId: codeDoc._id,
      code: shareCode,

      senderId,
      senderEmail,
      senderName,
      senderType,

      sentAt: new Date(),
      expiresAt: expiresAtTime,
      expiresIn: expirationTime,
      status: "pending"
    });

    res.json({
      code: shareCode,
      expiresIn: expirationTime,
      expiresAt: expiresAtTime.toISOString(),
    });

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

    const expiresAt = data.expiresAt ? new Date(data.expiresAt) : null;
    if (expiresAt && Date.now() >= expiresAt.getTime()) {
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

    res.json({ 
      content: decryptedContent,
      language: data.language || "auto-detect"
    });

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
        "code receiverName receiverEmail receiverType sentAt status"
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
        "code senderName senderEmail senderType sentAt receivedAt status"
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
