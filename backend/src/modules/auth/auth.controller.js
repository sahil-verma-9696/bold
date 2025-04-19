import { logError, logInfo, logSuccess } from "../../utils/logger.js";
import { COOKIE_CONST, setCookie } from "../../utils/cookieSetter.js";
import { generateTokens } from "../../utils/tokenGenerator.js";
import { DEFAULT_AVATAR } from "./constants.js";
import { STATUS_CODES, RESPONSE_TYPES } from "../../constants/script.js";
import { User } from "../user/models/user.model.js";
import dotenv from "dotenv";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../services/mail.js";

dotenv.config();

export async function signup(req, res) {
  logInfo(import.meta.url, "📩 Signup route hit");

  const { email, password, role, avatar } = req.body;
  if (!email || !password) {
    throw new Error("Please provide name, email, password");
  }

  const userExists = await User.findOne({
    email: email.trim().toLowerCase(),
  });
  if (userExists) {
    throw new Error(`${email} already exists`);
  }

  const user = await User.create({
    name: email.trim().toLowerCase().split("@")[0],
    email: email.trim().toLowerCase(),
    password: password.trim(),
    role,
    avatar: avatar === "" ? DEFAULT_AVATAR : avatar,
  });

  const { accessToken } = generateTokens(user._id);
  setCookie(res).setAccessToken(accessToken);

  logSuccess(import.meta.url, `✅ User created with ID: ${user._id}`);

  const userObj = user.toObject();
  delete userObj.password;

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "User created successfully",
    payload: {
      user: userObj,
    },
  });
}

export async function login(req, res) {
  logInfo(import.meta.url, "🔐 Login route hit");

  const { email, password } = req.body;

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!user || !user.password || !(await user.comparePassword(password))) {
    throw new Error("Invalid email or password");
  }

  const { accessToken } = generateTokens(user._id);
  setCookie(res).setAccessToken(accessToken);

  logSuccess(import.meta.url, `🔓 User logged in with ID: ${user._id}`);

  const userObj = user.toObject();
  delete userObj.password;

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "Logged in successfully",
    payload: {
      user: userObj,
    },
  });
}

export async function logout(req, res) {
  logInfo(import.meta.url, "🚪 Logout route hit");

  res.clearCookie(COOKIE_CONST.ACCESS_TOKEN);
  logSuccess(import.meta.url, "👋 User logged out successfully");

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "Logged out successfully",
    payload: null,
  });
}

export async function forgotPassword(req, res) {
  logInfo(import.meta.url, "🔑 Forgot password route hit");

  const { email } = req.body;

  if (!email) {
    throw new Error("Please provide email");
  }

  const cleanedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: cleanedEmail });

  if (!user) {
    throw new Error(`User with email ${cleanedEmail} not found`);
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  user.resetToken = resetToken;
  user.resetTokenExpires = resetTokenExpires;

  await user.save();

  const resetLink = `${process.env.FRONTEND_URL}/auth?token=${resetToken}&email=${cleanedEmail}&mode=reset`;

  sendEmail().toPasswordReset(cleanedEmail, resetLink);

  logSuccess(
    import.meta.url,
    `📧 Password reset email sent to ${cleanedEmail}`
  );

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "Reset email sent successfully",
    payload: null,
  });
}
export const resetPassword = async (req, res) => {
  logInfo(import.meta.url, "🔁 Reset password route hit");

  const { email, token, newPassword } = req.body;

  if (!email || !token || !newPassword) {
    throw new Error("Please provide email, token, and newPassword");
  }

  const cleanedEmail = email.trim().toLowerCase();
  const cleanedToken = decodeURIComponent(token).trim();

  const user = await User.findOne({ email: cleanedEmail });

  if (!user) {
    throw new Error("User not found");
  }

  // Debug logs
  console.log("Expected Token:", user.resetToken);
  console.log("Received Token:", cleanedToken);
  console.log("Expires At:", user.resetTokenExpires);
  console.log("Now:", new Date());

  if (
    user.resetToken !== cleanedToken ||
    !user.resetTokenExpires ||
    new Date() > user.resetTokenExpires
  ) {
    throw new Error("Invalid or expired token");
  }

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;

  await user.save();

  logSuccess(
    import.meta.url,
    `🔒 Password reset successful for user ID: ${user._id}`
  );

  res.status(STATUS_CODES.OK).json({
    type: RESPONSE_TYPES.SUCCESS,
    message: "Password reset successful",
    payload: null,
  });
};
