import express from "express";
import multer from "multer";
import path from "node:path";
import {
  sendFile,
  receiveFile,
  getSentFilesHistory,
  getReceivedFilesHistory,
  getAdminFileHistory
} from "../controllers/file.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authMiddlewareOptional from "../middleware/authOptional.middleware.js";
import { receiveFileRateLimiter, sendUploadRateLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${path.basename(file.originalname).replace(/[^a-zA-Z0-9._-]/g, "_")}`);
  }
});

const upload = multer({
  storage,
  limits: {
    files: 20,
    fileSize: 100 * 1024 * 1024,
  },
});

// Guest send (no history) - supports multiple files
router.post("/send", sendUploadRateLimiter, upload.array("files"), sendFile);

//  Logged-in send (history) - supports multiple files
router.post("/send-auth", sendUploadRateLimiter, authMiddleware, upload.array("files"), sendFile);


router.post("/receive", receiveFileRateLimiter, authMiddlewareOptional, receiveFile);


// Sent files
router.get("/files/sent", authMiddleware, getSentFilesHistory);

// Received files
router.get("/files/received", authMiddleware, getReceivedFilesHistory);



export default router;
