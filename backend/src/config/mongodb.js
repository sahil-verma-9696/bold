import mongoose from "mongoose";
import dotenv from "dotenv";
import { logError, logInfo, logSuccess } from "../utils/logger.js";
dotenv.config();

export async function connectDB() {
  logInfo(import.meta.url, "Connecting... to DB");
  try {
    const MONGO_URI = process.env.MONGO_URI;
    const responce = await mongoose.connect(MONGO_URI);
    logSuccess(
      import.meta.url,
      `Connected to MONGODB: ${responce.connection.host}`
    );
  } catch (error) {
    logError(import.meta.url, error.message); // Logs the error to the console
    process.exit(1);
  }
}
