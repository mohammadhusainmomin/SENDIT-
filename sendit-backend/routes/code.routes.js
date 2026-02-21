import express from "express";
import {
  sendCode,
  receiveCode,
  getMyCodes,
  getCodeHistory,
  getAdminCodeHistory
} from "../controllers/code.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

// Guests can send code (auth is optional for tracking senderId)
router.post("/code/send", sendCode);

// Guests can receive code
router.post("/code/receive", receiveCode);

// History requires authentication
router.get("/code/my", authMiddleware, getMyCodes);

// Code history (detailed tracking records)
router.get("/code/history", authMiddleware, getCodeHistory);

export default router;
