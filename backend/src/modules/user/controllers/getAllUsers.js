import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { logError, logInfo, logSuccess } from "../../../utils/logger.js";
import { User } from "../../auth/user.model.js";
import { MESSAGES } from "../constants.js";

export async function getAllUsers(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.GetAllUsers_HIT);
  try {
    const users = await User.find({
      _id: { $ne: req.user._id },
    }).select("-password");
    logSuccess(import.meta.url, MESSAGES.LOGS.GetAllUsers_SUCCESS);
    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.GET_ALL_USERS_SUCCESS,
      payload: users,
    });
  } catch (error) {
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message || MESSAGES.RESPONSE.ERROR_OCCURED,
      payload: null,
    });
  }
}
