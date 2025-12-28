import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    path: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    expiresAt: { type: Date, required: true },

    //  SENDER 
  senderId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null   
},


    //  RECEIVER
  receiverId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null
}

  },
  { timestamps: true }
);

// TTL 
fileSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("File", fileSchema);
