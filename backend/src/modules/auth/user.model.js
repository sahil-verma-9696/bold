import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { logError } from "../../utils/logger.js";
import { DEFAULT_AVATAR } from "./constants.js";
import { UserSettings } from "../user/models/userSetting.js";

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
    avatar: {
      type: String,
      default: DEFAULT_AVATAR,
    },
    bio: {
      type: String,
      default: "Hii there i am using ⚡ Bolt.",
    },
    username: {
      type: String,
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

    // Set default username if not already set
    if (!this.username) {
      // Make sure _id exists (it should at pre-save time)
      const idString = this._id.toString();
      this.username = `user_${idString.slice(-6)}`; // example: user_123abc
    }

    next();
  } catch (error) {
    logError("Error hashing password: " + error.message);
    next(error);
  }
});

// post-save hook to create user settings
UserSchema.post("save", async function (doc, next) {
  try {
    await UserSettings.create({ userId: doc._id });
    next();
  } catch (err) {
    console.error("Error creating user settings:", err);
    next(err);
  }
});

// compare password with hashed password
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
