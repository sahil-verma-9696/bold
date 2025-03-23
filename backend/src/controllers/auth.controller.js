import { logError, logInfo, logSuccess } from "../utils/logger.js";
import { User } from "../models/user.models.js";
import { COOKIE_CONST, setCookie } from "./utils/cookeiSetter.js";
import { generateTokens } from "./utils/tokenGenerator.js";
import jwt from "jsonwebtoken";
import { STATUS_CODES, RESPONSE_TYPES } from "./utils/constants.js";

export async function signup(req, res) {
  try {
    const { name, email, password, role, avatar } = req.body;

    if (!name || !email || !password) {
      logError(import.meta.url, "Please provide all the required fields");
      res.status(STATUS_CODES.BAD_REQUEST).json({
        type: RESPONSE_TYPES.ERROR,
        message: "Please provide all the required fields",
        payload: null,
      });
      return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      logError(import.meta.url, "User already exists");
      res.status(STATUS_CODES.BAD_REQUEST).json({
        type: RESPONSE_TYPES.ERROR,
        message: "User already exists",
        payload: null,
      });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      avatar,
    });

    const { accessToken, refreshToken } = generateTokens(user._id);

    setCookie(res).setAccessToken(accessToken);
    setCookie(res).setRefreshToken(refreshToken);

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "User created successfully",
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
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      logError(import.meta.url, "Please provide email and password");
      res.status(STATUS_CODES.BAD_REQUEST).json({
        type: RESPONSE_TYPES.ERROR,
        message: "Please provide email and password",
        payload: null,
      });
      return;
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      logError(import.meta.url, "Invalid credentials");
      res.status(STATUS_CODES.BAD_REQUEST).json({
        type: RESPONSE_TYPES.ERROR,
        message: "Invalid credentials",
        payload: null,
      });
      return;
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    setCookie(res).setAccessToken(accessToken);
    setCookie(res).setRefreshToken(refreshToken);

    logSuccess(import.meta.url, `USER: ${user._id} Logged in successfully`);

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "Logged in successfully",
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
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie(COOKIE_CONST.ACCESS_TOKEN);
    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "Logged out successfully",
      payload: null,
    });
  } catch (error) {
    logError(import.meta.url, error.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}

export async function refreshToken(req, res) {
  try {
    const refreshToken = req.cookies[COOKIE_CONST.REFRESH_TOKEN]; // Get refresh token from cookies
    if (!refreshToken)
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        type: RESPONSE_TYPES.ERROR,
        message: "No refresh token",
        payload: null,
      });
    console.log(refreshToken);

    // ✅ Verify Refresh Token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    console.log(decoded);

    const isUserExists = await User.findById(decoded.userId);
    if (!isUserExists)
      return res.status(STATUS_CODES.NOT_FOUND).json({
        type: RESPONSE_TYPES.ERROR,
        message: "User not found",
        payload: null,
      });

    // ✅ Generate New Access Token
    const { accessToken: newAccessToken } = generateTokens(decoded.userId);

    // ✅ Set new access token in cookies
    setCookie(res).setAccessToken(newAccessToken);

    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "New access token generated",
      payload: { accessToken: newAccessToken },
    });
  } catch (error) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json({
      type: RESPONSE_TYPES.ERROR,
      message: error.message,
      payload: null,
    });
  }
}
