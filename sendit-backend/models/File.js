import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
{
  code: {
    type: String,
    required: true
  },

  files: [
    {
      encryptedPath: String,
      originalName: String,
      mimeType: String
    }
  ],

  expiresAt: Date,
  expiresIn: { type: Number, default: 10 },

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

export default mongoose.model("File", fileSchema);