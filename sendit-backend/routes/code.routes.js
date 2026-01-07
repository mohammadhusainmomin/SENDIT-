import express from "express";
import {
  sendCode,
  receiveCode,
  getMyCodes
} from "../controllers/code.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/code/send", authMiddleware, sendCode);
router.post("/code/receive", authMiddleware, receiveCode);
router.get("/code/my", authMiddleware, getMyCodes);

export default router;
