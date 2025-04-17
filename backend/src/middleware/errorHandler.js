// error Handler middleware introduced
import { logError } from "../utils/logger.js";

export function errorHandler(err, req, res, next) {
  logError(import.meta.url, `🔥 Error caught by middleware: ${err.message}`);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  const name = err.name?.toLowerCase() || "";

  switch (true) {
    case name.includes("cast"):
      statusCode = 400;
      message = err.message || `Invalid ${err.path}: ${err.value}`;
      break;

    case name.includes("validation"):
      statusCode = 400;
      message =
        err.message ||
        Object.values(err.errors || {})
          .map((val) => val.message)
          .join(", ") ||
        "Validation failed";
      break;

    case name.includes("jsonwebtoken"):
      statusCode = 401;
      message = err.message || "Invalid token";
      break;

    case name.includes("tokenexpired"):
      statusCode = 401;
      message = err.message || "Token expired";
      break;

    case name.includes("econnreset") || err.code === "ECONNRESET":
      statusCode = 503;
      message = err.message || "Connection was reset unexpectedly";
      break;

    case name.includes("Cast to ObjectId failed"):
      statusCode = 400;
      message = `Invalid MongoDB ObjectId: ${err.value || err.message}`;
      break;

    case err.code === 11000:
      statusCode = 400;
      const field = Object.keys(err.keyValue || {})[0];
      message =
        err.message ||
        `Duplicate value for '${field}': ${err.keyValue?.[field]}`;
      break;

    default:
      break;
  }

  res.status(statusCode).json({
    success: false,
    message,
    payload: null,
  });
}
