export function checkAuth(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.CHECK_AUTH_HIT);
  try {
    logSuccess(
      import.meta.url,
      MESSAGES.LOGS.USER_AUTH_SUCCESS.replace("{}", req.user?.id)
    );

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.AUTH_SUCCESS,
      payload: { user: req.user },
    });
  } catch (error) {
    logError(
      import.meta.url,
      MESSAGES.LOGS.ERROR_OCCURED.replace("{}", error.message)
    );
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message || MESSAGES.RESPONSE.ERROR_OCCURED,
      payload: null,
    });
  }
}
