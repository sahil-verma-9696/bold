import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { logInfo, logSuccess } from "../../../utils/logger.js";
import { User } from "../../auth/user.model.js";
import { MESSAGES } from "../constants.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  logInfo(import.meta.url, MESSAGES.LOGS.GetAllUsers_HIT);

  const users = await User.find({ _id: { $ne: req.user._id } }).select(
    "-password"
  );

  logSuccess(import.meta.url, MESSAGES.LOGS.GetAllUsers_SUCCESS);

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: MESSAGES.RESPONSE.GET_ALL_USERS_SUCCESS,
    payload: users,
  });
});
