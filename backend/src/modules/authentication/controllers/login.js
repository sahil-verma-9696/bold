export async function login(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.LOGIN_HIT);
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.trim().toLowerCase() });

    if (!user || !user.password || !(await user.comparePassword(password))) {
      throw new Error(MESSAGES.RESPONSE.INVALID_CREDENTIALS);
    }

    const { accessToken } = generateTokens(user._id);
    setCookie(res).setAccessToken(accessToken);

    logSuccess(
      import.meta.url,
      MESSAGES.LOGS.USER_LOGGED_IN.replace("{}", user._id)
    );

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.LOGGED_IN,
      payload: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          lastSeen: user.lastSeen,
        },
      },
    });
  } catch (error) {
    logError(
      import.meta.url,
      MESSAGES.LOGS.ERROR_OCCURED.replace("{}", error.message)
    );

    const statusCode =
      error.message.includes("Missing") || error.message.includes("Invalid")
        ? STATUS_CODES.BAD_REQUEST
        : STATUS_CODES.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message || MESSAGES.RESPONSE.ERROR_OCCURED,
      payload: null,
    });
  }
}
