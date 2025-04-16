import { logError, logInfo, logSuccess } from "../../../utils/logger.js";
import { MESSAGES } from "../constants.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { User } from "../../auth/user.model.js";
import mongoose from "mongoose";

export async function getProfile(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.GetProfile_HIT);
  try {
    const id = req.params.id;
    console.log("id=", id);

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
      throw new Error("user not found");
    }

    logSuccess(import.meta.url, MESSAGES.LOGS.USER_FETCHED.replace("{}", id));

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.AUTH_SUCCESS,
      payload: { user },
    });
  } catch (error) {
    let statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = MESSAGES.RESPONSE.ERROR_OCCURED;

    switch (true) {
      case error.message.includes("Cast to ObjectId"):
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = "Invalid ID";
        break;

      case error.message.includes("Missing"):
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = "Missing user ID in request params";
        break;

      case error.message.includes("not found"):
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = "User not found";
        break;

      default:
        message = error.message || message;
        break;
    }

    logError(
      import.meta.url,
      MESSAGES.LOGS.ERROR_OCCURED?.replace("{}", message) || message
    );

    res.status(statusCode).json({
      type: RESPONSE_TYPES.ERROR,
      message,
      payload: null,
    });
  }
}
