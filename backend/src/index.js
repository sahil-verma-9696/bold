import { httpServer } from "./lib/socket.js";
import dotenv from "dotenv";
import { logSuccess } from "./utils/logger.js";
import { connectDB } from "./lib/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  httpServer.listen(PORT, function () {
    logSuccess(import.meta.url, `Server running on port ${PORT}`);
  });
}

startServer(); 
