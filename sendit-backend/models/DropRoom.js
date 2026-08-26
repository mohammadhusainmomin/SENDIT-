import mongoose from "mongoose";

const requiredFileSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: true,
      trim: true,
    },
    required: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false },
);

const dropRoomSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    instructions: {
      type: String,
      trim: true,
      default: "",
    },
    requiredFiles: {
      type: [requiredFileSchema],
      default: [],
    },
    maxFileSizeMB: {
      type: Number,
      default: 10,
      min: 1,
      max: 100,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    expiresIn: {
      type: Number,
      required: true,
    },
    organizerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organizerName: String,
    organizerEmail: String,
    isClosed: {
      type: Boolean,
      default: false,
    },
    closedAt: Date,
  },
  { timestamps: true },
);

dropRoomSchema.index({ organizerId: 1, createdAt: -1 });
dropRoomSchema.index({ code: 1 });
dropRoomSchema.index({ expiresAt: 1 });

export default mongoose.model("DropRoom", dropRoomSchema);
