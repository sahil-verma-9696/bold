import { logInfo, logSuccess } from "../../../utils/logger.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../../../utils/asyncHandler.js"; // Import asyncHandler

export const deleteMe = asyncHandler(async (req, res) => {
  logInfo(import.meta.url, "deleteMe() endpoint hit");

  const { _id } = req.user;

  const deletedUser = await User.findByIdAndDelete(_id);

  if (!deletedUser) {
    const error = new Error("Failed to delete the user");
    error.statusCode = STATUS_CODES.BAD_REQUEST;
    throw error;
  }

  logSuccess(import.meta.url, "Successfully user deleted");

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "User deleted successfully",
    payload: { user: deletedUser },
  });
});
