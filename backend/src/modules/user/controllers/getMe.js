import { logInfo, logSuccess } from "../../../utils/logger.js";
import { MESSAGES } from "../constants.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../../constants/script.js";
import { asyncHandler } from "../../../utils/asyncHandler.js"; // Import asyncHandler

export const getMe = asyncHandler(async (req, res) => {
  logInfo(import.meta.url, MESSAGES.LOGS.Getme_HIT);

  logSuccess(
    import.meta.url,
    "User authenticated successfully:" + req.user?.id
  );

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: MESSAGES.RESPONSE.AUTH_SUCCESS,
    payload: { user: req.user },
  });
});
