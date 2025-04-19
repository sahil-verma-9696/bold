import nodemailer from "nodemailer";
import { getPasswordResetEmail } from "../utils/emailTemplates.js";
import { getFriendRequestEmail } from "../utils/emailTemplates.js";
import dotenv from "dotenv"
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export function sendEmail() {
  return {
    toPasswordReset: async function (email, resetLink) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "🔒 Reset Your Password - ⚡Bolt",
        html: getPasswordResetEmail(resetLink),
      };

      return transporter.sendMail(mailOptions);
    },

    toFriendRequest: async function (email, senderName) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "👥 New Friend Request - ⚡Bolt",
        html: getFriendRequestEmail(senderName),
      };

      return transporter.sendMail(mailOptions);
    },
  };
}

