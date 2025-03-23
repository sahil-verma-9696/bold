import { User } from "../models/user.models.js";
import { logError } from "../utils/logger.js";
import { COOKIE_CONST } from "./utils/cookeiSetter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RESPONSE_TYPES, STATUS_CODES } from "./utils/constants.js";
dotenv.config();

export async function userProfile(req, res) {
  try {
    const user = req.user;
    if (!user) throw new Error("Notfound: User does not exist");

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "User profile fetched successfully",
      payload: { user },
    });
  } catch (error) {
    logError(import.meta.url, error.message);

    const statusCode =
      error.name === "JsonWebTokenError" || error.name === "TokenExpiredError"
        ? STATUS_CODES.UNAUTHORIZED
        : STATUS_CODES.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}

export async function updateProfileByUser(req, res) {
  try {
    const user = req.user;
    if (!user) throw new Error("Notfound: User does not exist");

    // ✅ Update Only Changed Fields
    const { name, avatar } = req.body;
    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    // ✅ Save Updated User
    await user.save();

    logSuccess(import.meta.url, "Profile updated successfully.");
    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "Profile updated successfully",
      payload: {
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    logError(import.meta.url, error.message);

    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}

// TODO: Implement Search Users pending due to skill model not created
export async function searchUsers(req, res) {}
