import express from "express";
import { submitContactForm } from "../controllers/contact.controller.js";
import { contactRateLimiter } from "../middleware/rateLimit.middleware.js";

const router = express.Router();

router.post("/contact", contactRateLimiter, submitContactForm);

export default router;
