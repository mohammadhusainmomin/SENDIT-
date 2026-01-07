import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
  {
    code: String,
    content: String,      // Encrypted content (includes IV in format: iv_hex:encrypted_hex)
    expiresAt: Date,

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
