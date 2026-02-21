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

    // Find all expired files
    const expiredFiles = await File.find({
      expiresAt: { $lte: now },
      isFileDeleted: { $ne: true }
    });

    console.log(`Found ${expiredFiles.length} expired files to clean up`);

    for (const fileBundle of expiredFiles) {
      try {
        // Delete all encrypted files from disk
        for (const file of fileBundle.files) {
          const decryptedExists = fs.existsSync(file.encryptedPath);
          if (decryptedExists) {
            deleteFileFromDisk(file.encryptedPath);
            console.log(`Deleted file: ${file.encryptedPath}`);
          }
        }

        // Update File document
        fileBundle.isFileDeleted = true;
        fileBundle.deletedAt = now;
        fileBundle.deletionReason = "expired";
        await fileBundle.save();

        // Update FileHistory documents
        await FileHistory.updateMany(
          { fileId: fileBundle._id },
          {
            isFileDeleted: true,
            isExpired: true,
            status: fileBundle.receiverId ? "received" : "expired",
            deletedAt: now,
            deletionReason: "expired"
          }
        );

        console.log(`Cleaned up file bundle: ${fileBundle.code}`);
      } catch (error) {
        console.error(`Error cleaning up file bundle ${fileBundle._id}:`, error);
      }
    }

    console.log("File cleanup completed");

    // Also cleanup expired code content
    await cleanupExpiredCodes();

    return expiredFiles.length;
  } catch (error) {
    console.error("Error in cleanupExpiredFiles:", error);
    return 0;
  }
};

/**
 * Start automatic cleanup scheduler
 * Runs every 5 minutes by default
 */
export const startCleanupScheduler = (intervalMinutes = 5) => {
  console.log(`Starting file cleanup scheduler (every ${intervalMinutes} minutes)`);

  // Run immediately on startup
  cleanupExpiredFiles();

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

    // Find all expired codes
    const expiredCodes = await Code.find({
      expiresAt: { $lte: now },
      content: { $exists: true, $ne: null }
    });

    console.log(`Found ${expiredCodes.length} expired codes to clean up`);

    for (const codeDoc of expiredCodes) {
      try {
        // Delete content but keep the document for potential future reference
        codeDoc.content = null;
        await codeDoc.save();

        // Update CodeHistory documents
        await CodeHistory.updateMany(
          { codeId: codeDoc._id },
          {
            isContentDeleted: true,
            isExpired: true,
            status: codeDoc.receiverId ? "received" : "expired",
            deletedAt: now,
            deletionReason: "expired"
          }
        );

        console.log(`Cleaned up code: ${codeDoc.code}`);
      } catch (error) {
        console.error(`Error cleaning up code ${codeDoc._id}:`, error);
      }
    }

    console.log("Code cleanup completed");
    return expiredCodes.length;
  } catch (error) {
    console.error("Error in cleanupExpiredCodes:", error);
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
