import { logError, logInfo, logSuccess } from "../../utils/logger.js";
import { COOKIE_CONST, setCookie } from "../../utils/cookieSetter.js";
import { generateTokens } from "../../utils/tokenGenerator.js";
import { DEFAULT_AVATAR, MESSAGES } from "./constants.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../constants/script.js";
import { User } from "../user/models/user.model.js";

export async function signup(req, res) {
  logInfo(import.meta.url, MESSAGES.LOGS.SIGNUP_HIT);

  try {
    const { email, password, role, avatar } = req.body;
    if (!email || !password) {
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
      name: email.trim().toLowerCase().split("@")[0],
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

    // Convert Mongoose document to plain object
    const userObj = user.toObject();
    delete userObj.password;

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.USER_CREATED,
      payload: {
        user: userObj,
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

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user || !user.password || !(await user.comparePassword(password))) {
      throw new Error(MESSAGES.RESPONSE.INVALID_CREDENTIALS);
    }

    const { accessToken } = generateTokens(user._id);
    setCookie(res).setAccessToken(accessToken);

    logSuccess(
      import.meta.url,
      MESSAGES.LOGS.USER_LOGGED_IN.replace("{}", user._id)
    );

    // Convert Mongoose document to plain object
    const userObj = user.toObject();
    delete userObj.password;

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: MESSAGES.RESPONSE.LOGGED_IN,
      payload: {
        user: userObj,
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
