import { RESPONSE_TYPES, STATUS_CODES } from "../../constants/script.js";
import { COOKIE_CONST } from "../../utils/cookieSetter.js";
import { User } from "./user.model.js";
import { logError, logInfo } from "../../utils/logger.js";
import jwt from "jsonwebtoken";

const MESSAGES = {
  RESPONSE: {
    NO_TOKEN: "Unauthorized - No token provided",
    USER_NOT_FOUND: "User not found",
  },
  LOGS: {
    MIDDLEWARE_HIT: "🔐 isProtected middleware hit",
    USER_PASSED: "👤 User passed middleware ✔️",
  },
};

export async function isProtected(req, res, next) {
  logInfo(import.meta.url, MESSAGES.LOGS.MIDDLEWARE_HIT); // ✅ Log when middleware is hit

  try {
    const accessToken = req.cookies[COOKIE_CONST.ACCESS_TOKEN];

    if (!accessToken) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        type: RESPONSE_TYPES.ERROR,
        message: MESSAGES.RESPONSE.NO_TOKEN,
        payload: null,
      });
    }

    const decodedUser = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const isExist = await User.findById(decodedUser.userId).select("-password");

    if (!isExist) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        type: RESPONSE_TYPES.ERROR,
        message: MESSAGES.RESPONSE.USER_NOT_FOUND,
        payload: null,
      });
    }

    req.user = isExist;
    logInfo(import.meta.url, MESSAGES.LOGS.USER_PASSED);
    next();
  } catch (error) {
    logError(import.meta.url, error.message);
    next(error);
  }
}

export function isAdmin(req, res, next) {
  try {
    const user = req.user;
    if (user.roll !== USER_ROLES.ADMIN) {
      return res.status(STATUS_CODES.FORBIDDEN).json({
        type: RESPONSE_TYPES.ERROR,
        message: "Only admin allow",
        payload: null,
      });
    }

    next();
  } catch (error) {
    logError(import.meta.url, error.message);
    next(error);
  }
}
