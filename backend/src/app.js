import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { ROUTES as AUTH_ROUTES } from "./modules/auth/constants.js";
import { ROUTES as USER_ROUTES } from "./modules/user/constants.js";
import { router as authRouter } from "./modules/auth/auth.routes.js";
import { router as userRouter } from "./modules/user/user.routes.js";
import { router as chatRouter } from "./modules/chat/chat.routes.js";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
import { router as notificationRouter } from "./modules/notification/notification.routes.js";

config();

const app = express();





export default app;
