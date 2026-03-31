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
