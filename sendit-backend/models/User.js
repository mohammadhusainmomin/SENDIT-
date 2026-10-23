import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    googleId: { type: String },
    picture: { type: String, default: "" },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
