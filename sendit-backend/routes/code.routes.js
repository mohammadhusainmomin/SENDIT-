import express from "express";
import {
  sendCode,
  receiveCode,
  getSentCodesHistory,
  getReceivedCodesHistory,
  getAdminCodeHistory
} from "../controllers/code.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import authOptional from "../middleware/authOptional.middleware.js";

const router = express.Router();

// Guests can send code (auth is optional for tracking senderId)
router.post("/code/send", authOptional, sendCode);

// Guests can receive code
router.post("/code/receive", authOptional, receiveCode);

// History requires authentication
router.get("/code/sent", authMiddleware, getSentCodesHistory);
router.get("/code/received", authMiddleware, getReceivedCodesHistory);

export default router;
