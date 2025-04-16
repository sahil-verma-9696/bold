import mongoose from "mongoose";

const knowUserSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    knownUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["friend", "blocked", "pending"],
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

knowUserSchema.index({ userId: 1, knownUserId: 1 }, { unique: true });

export const KnowUser = mongoose.model("KnowUser", knowUserSchema);
