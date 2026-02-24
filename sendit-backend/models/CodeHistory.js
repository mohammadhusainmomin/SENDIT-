import mongoose from "mongoose";

const codeHistorySchema = new mongoose.Schema(
  {
   codeId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Code"
},
    code: {
      type: String,
      required: true
    },

    // Content preview (not encrypted - just for display)
    contentPreview: {
      type: String,
      description: "First 100 chars of code for display in history"
    },

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

    // Content deletion (only content deleted, history preserved)
    isContentDeleted: {
      type: Boolean,
      default: false
    },
    deletedAt: Date,
    deletionReason: {
      type: String,
      enum: ["expired", "manual"],
      description: "Why the content was deleted"
    }
  },
  { timestamps: true }
);

// Index for quick queries
codeHistorySchema.index({ senderId: 1, sentAt: -1 });
codeHistorySchema.index({ receiverId: 1, receivedAt: -1 });
codeHistorySchema.index({ code: 1 });
codeHistorySchema.index({ expiresAt: 1 });
codeHistorySchema.index({ status: 1 });

export default mongoose.model("CodeHistory", codeHistorySchema);
