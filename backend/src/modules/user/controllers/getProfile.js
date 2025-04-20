import { logInfo, logSuccess, logError } from "../../../utils/logger.js";
import { MESSAGES } from "../constants.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { User } from "../models/user.js";
import mongoose from "mongoose";
import { asyncHandler } from "../../../utils/asyncHandler.js";

// The handler function
export const getProfile = asyncHandler(async (req, res) => {
  logInfo(import.meta.url, MESSAGES.LOGS.GetProfile_HIT);
  const id = req.params.id;

  if (!id) {
    logError(import.meta.url, "params not found");
    throw new Error("Missing user ID in request params");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }

  const user = await User.findById(id).select("-password");

  if (!user) {
    logError(import.meta.url, "user not found");
    throw new Error("User not found");
  }

  logSuccess(import.meta.url, MESSAGES.LOGS.USER_FETCHED.replace("{}", id));

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: MESSAGES.RESPONSE.AUTH_SUCCESS,
    payload: { user },
  });
});
