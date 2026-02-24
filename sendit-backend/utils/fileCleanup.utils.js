import fs from "fs";
import path from "path";
import File from "../models/File.js";
import FileHistory from "../models/FileHistory.js";
import Code from "../models/Code.js";
import CodeHistory from "../models/CodeHistory.js";

/**
 * Delete a single file from disk
 */
export const deleteFileFromDisk = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
  } catch (error) {
    console.error(`Error deleting file ${filePath}:`, error);
  }
  return false;
};

/**
 * Clean up expired files and update history
 * This should be called periodically (e.g., every 5 minutes)
 */
export const cleanupExpiredFiles = async () => {
  try {
    const now = new Date();

    const expiredFiles = await File.find({
      expiresAt: { $lte: now },
    });

    console.log(`Found ${expiredFiles.length} expired files`);

    for (const fileBundle of expiredFiles) {
      // 1️⃣ Delete encrypted files from disk
      for (const file of fileBundle.files) {
        if (file.encryptedPath && fs.existsSync(file.encryptedPath)) {
          fs.unlinkSync(file.encryptedPath);
        }
      }

      // 2️⃣ Update history
      await FileHistory.updateMany(
        { fileId: fileBundle._id },
        {
          isFileDeleted: true,
          isExpired: true,
          status: "expired",
          deletedAt: now,
          deletionReason: "expired",
        },
      );

      // 3️⃣ Delete File document from DB
      await File.deleteOne({ _id: fileBundle._id });

      console.log(`Deleted file bundle with code: ${fileBundle.code}`);
    }

    return expiredFiles.length;
  } catch (error) {
    console.error("Cleanup error:", error);
    return 0;
  }
};

/**
 * Start automatic cleanup scheduler
 * Runs every 5 minutes by default
 */
export const startCleanupScheduler = async (intervalMinutes = 5) => {
  console.log(
    `Starting file cleanup scheduler (every ${intervalMinutes} minutes)`,
  );

  // Run immediately on startup
  await cleanupExpiredFiles();
  await cleanupExpiredCodes();
  // Then run periodically
  const intervalMs = intervalMinutes * 60 * 1000;
  return setInterval(cleanupExpiredFiles, intervalMs);
};

/**
 * Clean up expired code content (keep history, delete content)
 */
export const cleanupExpiredCodes = async () => {
  try {
    const now = new Date();

    const expiredCodes = await Code.find({
      expiresAt: { $lte: now }
    });

    for (const codeDoc of expiredCodes) {

      await CodeHistory.updateMany(
        { codeId: codeDoc._id },
        {
          isExpired: true,
          isContentDeleted: true,
          status: "expired",
          deletedAt: now,
          deletionReason: "expired"
        }
      );

      await Code.deleteOne({ _id: codeDoc._id });
    }

    return expiredCodes.length;

  } catch (error) {
    console.error("Code cleanup error:", error);
    return 0;
  }
};

/**
 * Stop the cleanup scheduler
 */
export const stopCleanupScheduler = (intervalId) => {
  if (intervalId) {
    clearInterval(intervalId);
    console.log("File cleanup scheduler stopped");
  }
};
