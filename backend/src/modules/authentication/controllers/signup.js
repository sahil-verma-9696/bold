import { User } from "../../../models/user.models";

export async function signup(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.SIGNUP_HIT);

  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      throw new Error(
        MESSAGES.RESPONSE.MISSING_FIELDS.replace("{}", "name, email, password")
      );
    }

    const userExists = await User.findOne({
      email: email.trim().toLowerCase(),
    });
    if (userExists) {
      throw new Error(MESSAGES.LOGS.USER_EXISTS.replace("{}", email));
    }

    // ✅ Create user
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
      role,
      avatar: avatar === "" ? DEFAULT_AVATAR : avatar,
    });

    const { accessToken } = generateTokens(user._id);
    setCookie(res).setAccessToken(accessToken);

    logSuccess(
      import.meta.url,
      MESSAGES.LOGS.USER_CREATED.replace("{}", user._id)
    );

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.USER_CREATED,
      payload: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
      },
    });
  } catch (error) {
    logError(
      import.meta.url,
      MESSAGES.LOGS.ERROR_OCCURED.replace("{}", error.message)
    );

    const statusCode =
      error.message.includes("Missing") || error.message.includes("Exists")
        ? STATUS_CODES.BAD_REQUEST
        : STATUS_CODES.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message || MESSAGES.RESPONSE.ERROR_OCCURED,
      payload: null,
    });
  }
}
