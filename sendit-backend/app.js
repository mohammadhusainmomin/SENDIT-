import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import connectDB from "./db.js";
import { startCleanupScheduler } from "./utils/fileCleanup.utils.js";

import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";
import codeRoutes from "./routes/code.routes.js";
import adminRoutes from "./routes/admin.routes.js";


connectDB();

// Start file cleanup scheduler (runs every 5 minutes)
startCleanupScheduler(5);

const app = express();

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://senditsystem.netlify.app",
      "https://senditsystemadmin.netlify.app"
    ];

    // Allow all localhost origins
    if (!origin || origin.includes("localhost") || origin.includes("127.0.0.1")) {
      callback(null, true);
    } else if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Disposition"]
};

app.use(cors(corsOptions));
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api", fileRoutes);
app.use("/api", codeRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
