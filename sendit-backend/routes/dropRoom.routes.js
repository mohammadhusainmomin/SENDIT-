import express from "express";
import multer from "multer";
import {
  closeDropRoom,
  createDropRoom,
  downloadAllDropRoomFiles,
  downloadSubmissionFile,
  getDropRoomDetails,
  getMyDropRooms,
  getPublicDropRoom,
  submitToDropRoom,
} from "../controllers/dropRoom.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `drop-${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    files: 20,
    fileSize: 100 * 1024 * 1024,
  },
});

router.post("/drop-rooms", authMiddleware, createDropRoom);
router.get("/drop-rooms", authMiddleware, getMyDropRooms);
router.get("/drop-rooms/public/:code", getPublicDropRoom);
router.post("/drop-rooms/public/:code/submissions", upload.array("documents"), submitToDropRoom);
router.get("/drop-rooms/:roomId", authMiddleware, getDropRoomDetails);
router.post("/drop-rooms/:roomId/close", authMiddleware, closeDropRoom);
router.get("/drop-rooms/:roomId/download-all", authMiddleware, downloadAllDropRoomFiles);
router.get(
  "/drop-rooms/:roomId/submissions/:submissionId/files/:fileIndex",
  authMiddleware,
  downloadSubmissionFile,
);

export default router;
