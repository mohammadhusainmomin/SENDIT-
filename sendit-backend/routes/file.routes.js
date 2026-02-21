import express from "express";
import multer from "multer";
import {
  sendFile,
  receiveFile,
  getMyFiles,
  downloadFromHistory,
  getUserFileHistory,
  getAdminFileHistory
} from "../controllers/file.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Guest send (no history) - supports multiple files
router.post("/send", upload.array("files"), sendFile);

//  Logged-in send (history) - supports multiple files
router.post("/send-auth", authMiddleware, upload.array("files"), sendFile);

//  Receive (guests can receive, auth is optional for history tracking)
router.post("/receive", receiveFile);

//  History
router.get("/files/my", authMiddleware, getMyFiles);

//  File history (detailed records)
router.get("/files/history", authMiddleware, getUserFileHistory);

//  Download from history
router.get("/files/download/:id", authMiddleware, downloadFromHistory);

export default router;
