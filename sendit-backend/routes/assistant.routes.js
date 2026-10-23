import express from "express";
import { chatWithGemini } from "../controllers/assistant.controller.js";
import { assistantRateLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post("/assistant/chat", assistantRateLimiter, chatWithGemini);

export default router;
