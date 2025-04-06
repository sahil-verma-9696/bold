export async function logout(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.LOGOUT_HIT);
  try {
    res.clearCookie(COOKIE_CONST.ACCESS_TOKEN);
    logSuccess(import.meta.url, MESSAGES.LOGS.USER_LOGGED_OUT);

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.LOGGED_OUT,
      payload: null,
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
