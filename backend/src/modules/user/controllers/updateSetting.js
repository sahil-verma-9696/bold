import { logError, logInfo, logSuccess } from "../../../utils/logger.js";
import { MESSAGES } from "../constants.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { UserSettings } from "../models/userSetting.js";

export async function updateSettings(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.UpdateSettings_HIT);

  try {
    const { _id } = req.user;
    const { notificationsEnabled, darkMode } = req.body;

    if (notificationsEnabled === undefined && darkMode === undefined) {
      throw new Error("No fields to update");
    }

    const settings = await UserSettings.findOneAndUpdate(
      { userId: _id },
      {
        ...(notificationsEnabled !== undefined && { notificationsEnabled }),
        ...(darkMode !== undefined && { darkMode }),
      },
      { new: true }
    );

    if (!settings) {
      logError(import.meta.url, "settings not found for update");
      throw new Error("User settings not found");
    }

    logSuccess(
      import.meta.url,
      MESSAGES.LOGS.SETTINGS_UPDATED.replace("{}", _id)
    );

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.SETTINGS_UPDATED,
      payload: { settings },
    });
  } catch (error) {
    let statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = MESSAGES.RESPONSE.ERROR_OCCURED;

    switch (true) {
      case error.message.includes("not found"):
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = "User settings not found";
        break;

      case error.message.includes("No fields to update"):
        statusCode = STATUS_CODES.BAD_REQUEST;
        message = "Please provide at least one field to update";
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
