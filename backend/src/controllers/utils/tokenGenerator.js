import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

export function generateAccessToken(userId) {
  return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: "7d" }); // 7 days
}

export function generateRefreshToken(userId) {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" }); // 
}

// Function to generate both tokens together
export function generateTokens(userId) {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
}
