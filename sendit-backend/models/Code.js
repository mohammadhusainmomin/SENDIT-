import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      sparse: true
    },
    content: String,      // Encrypted content (includes IV in format: iv_hex:encrypted_hex)
    language: {
      type: String,
      enum: [
        "auto-detect",
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "python",
        "java",
        "c",
        "cpp",
        "csharp",
        "php",
        "html",
        "css",
        "json",
        "plaintext"
      ],
      default: "auto-detect",
      description: "Programming language for syntax highlighting and formatting"
    },
    expiresAt: Date,
    expiresIn: {
      type: Number,
      default: 10,
      description: "Expiration time in minutes"
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Code", codeSchema);
