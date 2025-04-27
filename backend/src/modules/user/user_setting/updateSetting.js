import { logError, logInfo, logSuccess } from "../../../utils/logger.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { UserSettings } from "../models/userSetting.js";

export async function updateSettings(req, res) {
  logInfo(import.meta.url, "updateSettings() endpoint hit");

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

    logSuccess(import.meta.url, "User settings updated successfully");

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "User settings updated successfully",
      payload: { settings },
    });
  } catch (error) {
    let statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR;
    let message = "Something went wrong";

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

    logError(import.meta.url, "updateSettings() endpoint failed" || message);

    res.status(statusCode).json({
      type: RESPONSE_TYPES.ERROR,
      message,
      payload: null,
    });
  }
}
