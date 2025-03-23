import {
  RESPONSE_TYPES,
  STATUS_CODES,
} from "../controllers/utils/constants.js";
import { USER_ROLES } from "../models/constants.js";
import { logError } from "../utils/logger.js";

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
