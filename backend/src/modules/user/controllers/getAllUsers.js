import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { logInfo } from "../../../utils/logger.js";
import { User } from "../models/user.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendResponse } from "../../../utils/response.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  logInfo(import.meta.url, "getAllUsers() endpoint hit");

  const users = await User.find({ _id: { $ne: req.user._id } }).select(
    "-password"
  );

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    "all users fetched",
    users
  );

});
