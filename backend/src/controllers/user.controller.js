import { logError, logInfo, logSuccess } from "../utils/logger.js";
import dotenv from "dotenv";
import { RESPONSE_TYPES, STATUS_CODES, MESSAGES } from "./utils/constants.js";
dotenv.config();

export async function userProfile(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.PROFILE_HIT);
  try {
    const user = req.user;
    if (!user) throw new Error(MESSAGES.RESPONSE.USER_NOT_FOUND);

    logSuccess(import.meta.url, MESSAGES.LOGS.PROFILE_FETCHED.format(user._id));

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.PROFILE_FETCHED,
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
  logInfo(import.meta.url, MESSAGES.LOGS.PROFILE_UPDATE_HIT);
  try {
    const user = req.user;
    if (!user) throw new Error(MESSAGES.RESPONSE.USER_NOT_FOUND);

    // ✅ Update Only Changed Fields
    const { name, avatar } = req.body;
    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    // ✅ Save Updated User
    await user.save();

    logSuccess(import.meta.url, MESSAGES.LOGS.PROFILE_UPDATED.format(user._id));

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.PROFILE_UPDATED,
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
export async function searchUsers(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.SEARCH_USERS_HIT);
  res.status(STATUS_CODES.NOT_IMPLEMENTED).json({
    type: RESPONSE_TYPES.ERROR,
    message: MESSAGES.RESPONSE.FEATURE_NOT_IMPLEMENTED,
    payload: null,
  });
}
