import { logError, logInfo, logSuccess } from "../../../utils/logger.js";
import { MESSAGES } from "../constants.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { User } from "../../auth/user.model.js";

export async function deleteMe(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.DeleteMe_HIT);
  try {
    const { _id } = req.user;

    const deletedUser = await User.findByIdAndDelete(_id);

    if (!deletedUser) {
      logError(import.meta.url, "failed to delete");
      throw new Error("faild to delete the user");
    }

    logSuccess(import.meta.url, "successfully user deleted");

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "user deleted successfully",
      payload: { user: deletedUser },
    });
  } catch (error) {
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: "failed to delete the user",
      payload: null,
    });
  }
}
