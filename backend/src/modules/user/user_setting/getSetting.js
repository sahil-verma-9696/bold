import { logError, logInfo, logSuccess } from "../../../utils/logger.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { UserSettings } from "../models/userSetting.js";

export async function getSettings(req, res) {
  logInfo(import.meta.url, "getSettings() endpoint hit");
  try {
    const { _id } = req.user;

    const settings = await UserSettings.findOne({ userId: _id });

    if (!settings) {
      logError(import.meta.url, "settings not found");
      throw new Error("User settings not found");
    }

    logSuccess(import.meta.url, "User settings fetched successfully");

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "User settings fetched successfully",
      payload: { settings },
    });
  } catch (error) {
    let statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong";

    switch (true) {
      case error.message.includes("settings not found"):
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = "User settings not found";
        break;

      default:
        message = error.message || message;
        break;
    }

    logError(import.meta.url, "Error in getSettings() endpoint" || message);

    res.status(statusCode).json({
      type: RESPONSE_TYPES.ERROR,
      message,
      payload: null,
    });
  }
}
