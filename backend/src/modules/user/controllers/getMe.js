import { logInfo } from "../../../utils/logger.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { asyncHandler } from "../../../utils/asyncHandler.js"; // Import asyncHandler
import { sendResponse } from "../../../utils/response.js";

export const getMe = asyncHandler(async (req, res) => {
  logInfo(import.meta.url, "getMe() endpoint hit");
  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    req.user?.name + " User authenticated successfully",
    { user: req.user }
  );
});
