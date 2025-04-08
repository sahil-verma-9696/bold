import { logError, logInfo, logSuccess } from "../../utils/logger.js";
import { COOKIE_CONST, setCookie } from "../../utils/cookieSetter.js";
import { generateTokens } from "../../utils/tokenGenerator.js";
import {
  DEFAULT_AVATAR,
  STATUS_CODES,
  RESPONSE_TYPES,
  MESSAGES,
} from "./constants.js";
import { User } from "./user.model.js";

export async function signup(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.SIGNUP_HIT);

  try {
    const { name, email, password, role, avatar } = req.body;

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

export function getMe(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.Getme_AUTH_HIT);
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
