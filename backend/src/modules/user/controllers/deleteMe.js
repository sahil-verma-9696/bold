import { logInfo } from "../../../utils/logger.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { User } from "../models/user.js";
import { asyncHandler } from "../../../utils/asyncHandler.js"; // Import asyncHandler
import { sendResponse } from "../../../utils/response.js";

export const deleteMe = asyncHandler(async (req, res) => {
  logInfo(import.meta.url, "deleteMe() endpoint hit");

  const { _id } = req.user;

  const deletedUser = await User.findByIdAndDelete(_id);

  if (!deletedUser) {
    const error = new Error("Failed to delete the user");
    error.statusCode = STATUS_CODES.BAD_REQUEST;
    throw error;
  }

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    "User deleted successfully",
    { user: deletedUser }
  );
});
