import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { COOKIE_CONST } from "../../../utils/cookieSetter.js";
import { logInfo } from "../../../utils/logger.js";
import { sendResponse } from "../../../utils/response.js";

export async function logout(req, res) {
  logInfo(import.meta.url, "🚪 Logout route hit");

  res.clearCookie(COOKIE_CONST.ACCESS_TOKEN);

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    `${req.user.name} Logged out successfully`,
    null
  );
}
