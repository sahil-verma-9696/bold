import { RESPONSE_TYPES, STATUS_CODES } from "../../../constants/script.js";
import { sendEmail } from "../../../services/mail.js";
import { logInfo } from "../../../utils/logger.js";
import { sendResponse } from "../../../utils/response.js";
import { User } from "../../user/models/user.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

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

  sendResponse(
    res,
    STATUS_CODES.OK,
    RESPONSE_TYPES.SUCCESS,
    `📧 Password reset email sent to ${cleanedEmail}`,
    null
  );
}
