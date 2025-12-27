import express from "express";
import cors from "cors";
import fileRoutes from "./routes/file.routes.js";
import dotenv from "dotenv";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();
connectDB();


const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://senditsystem.netlify.app"
    ],
    credentials: true
  })
);
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));



app.use("/api", fileRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
