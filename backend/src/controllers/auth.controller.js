import { logError, logInfo, logSuccess } from "../utils/logger.js";
import { User } from "../models/user.models.js";
import { COOKIE_CONST, setCookie } from "./utils/cookeiSetter.js";
import { generateTokens } from "./utils/tokenGenerator.js";
import jwt from "jsonwebtoken";
import { STATUS_CODES, RESPONSE_TYPES } from "./utils/constants.js";

export async function signup(req, res) {
  try {
    const { name, email, password, role, avatar } = req.body;

    if (!name || !email || !password)
      throw new Error("Missing: required fields: name, email, or password.");

    const userExists = await User.findOne({ email });

    if (userExists) throw new Error("Exists: User already exists.");

    const user = await User.create({
      name,
      email,
      password,
      role,
      avatar,
    });

    const { accessToken, refreshToken } = generateTokens(user._id);

    setCookie(res).setAccessToken(accessToken);
    // setCookie(res).setRefreshToken(refreshToken);

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
    const statusCode =
      error.message.includes("Missing") || error.message.includes("Exists")
        ? STATUS_CODES.BAD_REQUEST
        : STATUS_CODES.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
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
      throw new Error("Missing required fields: credentials");
    }

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new Error("Invalid credentials");
    }

    const { accessToken, refreshToken } = generateTokens(user._id);

    setCookie(res).setAccessToken(accessToken);
    // setCookie(res).setRefreshToken(refreshToken);

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
    const statusCode =
      error.message.includes("Missing") || error.message.includes("Invalid")
        ? STATUS_CODES.BAD_REQUEST
        : STATUS_CODES.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
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

// export async function refreshToken(req, res) {
//   try {
//     const refreshToken = req.cookies[COOKIE_CONST.REFRESH_TOKEN]; // Get refresh token from cookies
//     if (!refreshToken) throw new Error("Missing: refresh token");

//     // ✅ Verify Refresh Token
//     const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//     if (!decoded || !decoded.userId) throw new Error("Invalid: refresh token");

//     // ✅ Check if user exists
//     const user = await User.findById(decoded.userId);
//     if (!user) throw new Error("NotFound: User does not exist");

//     // ✅ Generate New Access Token
//     const { accessToken: newAccessToken } = generateTokens(user._id);

//     // ✅ Set new access token in cookies
//     setCookie(res).setAccessToken(newAccessToken);

//     logSuccess(import.meta.url, "New access token generated successfully.");
//     res.status(STATUS_CODES.OK).json({
//       type: RESPONSE_TYPES.SUCCESS,
//       message: "New access token generated",
//       payload: { accessToken: newAccessToken },
//     });
//   } catch (error) {
//     logError(import.meta.url, error.message);

//     const statusCode =
//       error.message.includes("Missing") ||
//       error.message.includes("Invalid") ||
//       error.message.includes("NotFound")
//         ? STATUS_CODES.UNAUTHORIZED
//         : STATUS_CODES.INTERNAL_SERVER_ERROR;

//     res.status(statusCode).json({
//       type: RESPONSE_TYPES.ERROR,
//       message: error.message,
//       payload: {},
//     });
//   }
// }

export function checkAuth(req, res) {
  try {
    res.status(STATUS_CODES.OK).json({
      type: RESPONSE_TYPES.SUCCESS,
      message: "User authenticated successfully",
      payload: {
        user: req.user,
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
