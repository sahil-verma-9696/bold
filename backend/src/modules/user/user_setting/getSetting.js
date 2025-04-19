import { logError, logInfo, logSuccess } from "../../../utils/logger.js";
import { MESSAGES } from "../constants.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { UserSettings } from "../models/userSetting.js";

export async function getSettings(req, res) {
  console.log("getSettings");

  logInfo(import.meta.url, MESSAGES.LOGS.GetSettings_HIT);
  try {
    const { _id } = req.user;

    const settings = await UserSettings.findOne({ userId: _id });

    if (!settings) {
      logError(import.meta.url, "settings not found");
      throw new Error("User settings not found");
    }

    logSuccess(
      import.meta.url,
      MESSAGES.LOGS.SETTINGS_FETCHED.replace("{}", _id)
    );

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.SETTINGS_FETCHED,
      payload: { settings },
    });
  } catch (error) {
    let statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = MESSAGES.RESPONSE.ERROR_OCCURED;

    switch (true) {
      case error.message.includes("settings not found"):
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = "User settings not found";
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
