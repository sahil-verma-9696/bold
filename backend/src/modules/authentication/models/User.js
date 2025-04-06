import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { logError } from "../utils/logger.js";
import { DEFAULT_AVATAR } from "../constants/script.js";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
    avatar: {
      type: String,
      default: DEFAULT_AVATAR,
    },
  },
  { timestamps: true } // Auto-adds createdAt & updatedAt
);

// pre-save hook to hash password before saving to database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    logError("Error hashing password: " + error.message);
    next(error);
  }
});

// compare password with hashed password
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", UserSchema);
