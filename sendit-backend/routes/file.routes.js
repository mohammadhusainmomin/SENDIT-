import express from "express";
import multer from "multer";
import {
  sendFile,
  receiveFile,
  getSentFilesHistory,
  getReceivedFilesHistory,
  getAdminFileHistory
} from "../controllers/file.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authMiddlewareOptional from "../middleware/authOptional.middleware.js";

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


router.post("/receive", authMiddlewareOptional, receiveFile);


// Sent files
router.get("/files/sent", authMiddleware, getSentFilesHistory);

// Received files
router.get("/files/received", authMiddleware, getReceivedFilesHistory);



export default router;
