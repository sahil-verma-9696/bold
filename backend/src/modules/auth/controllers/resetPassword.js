import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { logInfo } from "../../../utils/logger.js";
import { sendResponse } from "../../../utils/response.js";
import { User } from "../../user/models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

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

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    `🔒 Password reset successful for user ID: ${user._id}`,
    null
  );
};
