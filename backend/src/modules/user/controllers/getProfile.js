import { logInfo, logSuccess, logError } from "../../../utils/logger.js";
import { MESSAGES } from "../constants.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { User } from "../models/user.js";
import mongoose from "mongoose";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendResponse } from "../../../utils/response.js";

// The handler function
export const getProfile = asyncHandler(async (req, res) => {
  logInfo(import.meta.url, MESSAGES.LOGS.GetProfile_HIT);
  const id = req.params.id;

  if (!id) {
    throw new Error("Missing user ID in request params");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid Id");
  }

  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    user.name + " profile fetched successfully",
    { user }
  );
});
