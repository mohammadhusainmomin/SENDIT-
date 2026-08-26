import mongoose from "mongoose";

const submittedFileSchema = new mongoose.Schema(
  {
    slotLabel: {
      type: String,
      required: true,
      trim: true,
    },
    encryptedPath: String,
    originalName: String,
    mimeType: String,
    size: Number,
  },
  { _id: false },
);

const dropSubmissionSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DropRoom",
      required: true,
    },
    roomCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    submitterName: {
      type: String,
      required: true,
      trim: true,
    },
    submitterEmail: {
      type: String,
      trim: true,
      default: "",
    },
    files: {
      type: [submittedFileSchema],
      default: [],
    },
    missingSlots: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ["complete", "partial", "expired", "deleted"],
      default: "partial",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
    deletionReason: {
      type: String,
      enum: ["expired", "manual"],
    },
  },
  { timestamps: true },
);

dropSubmissionSchema.index({ roomId: 1, submittedAt: -1 });
dropSubmissionSchema.index({ roomCode: 1 });
dropSubmissionSchema.index({ submitterEmail: 1 });

export default mongoose.model("DropSubmission", dropSubmissionSchema);
