import mongoose from "mongoose";

const fileHistorySchema = new mongoose.Schema(
  {
    // File reference
    fileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: true
    },
    code: {
      type: String,
      required: true
    },

    // File details
    originalName: String,
    mimeType: String,
    fileSize: Number,

    // Sender details
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    senderEmail: String,
    senderName: String,
    senderType: {
      type: String,
      enum: ["authenticated", "guest"],
      default: "guest"
    },
    sentAt: {
      type: Date,
      default: Date.now
    },

    // Receiver details
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    receiverEmail: String,
    receiverName: String,
    receiverType: {
      type: String,
      enum: ["authenticated", "guest"],
      default: "guest"
    },
    receivedAt: Date,

    // Expiration details
    expiresAt: Date,
    expiresIn: {
      type: Number,
      description: "Expiration time in minutes"
    },
    isExpired: {
      type: Boolean,
      default: false
    },

    // Status tracking
    status: {
      type: String,
      enum: ["pending", "received", "expired", "deleted"],
      default: "pending"
    },

    // File deletion
    isFileDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date,
    deletionReason: {
      type: String,
      enum: ["expired", "manual"],
      description: "Why the file was deleted"
    }
  },
  { timestamps: true }
);

// Index for quick queries
fileHistorySchema.index({ senderId: 1, sentAt: -1 });
fileHistorySchema.index({ receiverId: 1, receivedAt: -1 });
fileHistorySchema.index({ code: 1 });
fileHistorySchema.index({ expiresAt: 1 });
fileHistorySchema.index({ status: 1 });

export default mongoose.model("FileHistory", fileHistorySchema);
