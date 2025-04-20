import { logSuccess, logError, logWarning } from "./logger.js";

export function sendResponse(res, statusCode, type, message, payload = null) {
  switch (true) {
    case type === "success":
      logSuccess(import.meta.url, message);
      break;

    case type === ("error" || "fail"):
      logError(import.meta.url, message);
      throw new Error(message);
      break;

    default:
      logWarning(import.meta.url, message || "unexpected happend");
      break;
  }

  res.status(statusCode).json({
    type: type || (statusCode >= 400 ? "error" : "success"),
    message:
      message ||
      (statusCode >= 400 ? "Something went wrong" : "Request was successful"),
    payload: payload || null,
  });
}
