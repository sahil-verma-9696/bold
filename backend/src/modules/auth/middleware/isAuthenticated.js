import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { COOKIE_CONST } from "../../../utils/cookieSetter.js";
import { User } from "../../user/models/user.model.js";
import { logInfo } from "../../../utils/logger.js";
import jwt from "jsonwebtoken";
import { sendResponse } from "../../../utils/response.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  logInfo(import.meta.url, "🔐 isAuthenticated middleware hit");

  const accessToken = req.cookies[COOKIE_CONST.ACCESS_TOKEN];

  if (!accessToken) {
    return sendResponse(
      res,
      STATUS_CODES.UNAUTHORIZED,
      RESPONSE_TYPES.ERROR,
      "Unauthorized - No token provided"
    );
  }

  const decodedUser = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const isExist = await User.findById(decodedUser.userId).select("-password");

  if (!isExist) {
    return sendResponse(
      res,
      STATUS_CODES.NOT_FOUND,
      RESPONSE_TYPES.FAIL,
      "User not found"
    );
  }

  req.user = isExist;
  logInfo(import.meta.url, "👤 User passed middleware ✔️");
  next();
});
