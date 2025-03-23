import {
  RESPONSE_TYPES,
  STATUS_CODES,
} from "../controllers/utils/constants.js";
import { COOKIE_CONST } from "../controllers/utils/cookeiSetter.js";
import { User } from "../models/user.models.js";
import { logError } from "../utils/logger.js";
import jwt from "jsonwebtoken";

export async function isProtected(req, res, next) {
  try {
    const accessToken = req.cookies[COOKIE_CONST.ACCESS_TOKEN];

    if (!accessToken) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({
        type: RESPONSE_TYPES.ERROR,
        message: "Unauthorized - No token provided",
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
        message: "User not found",
        payload: null,
      });
    }

    req.user = isExist;

    next();
  } catch (error) {
    logError(import.meta.url, error.message);
    next(error);
  }
}
