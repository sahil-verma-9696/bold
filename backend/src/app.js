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

app.use(
  cors({
    origin: "http://localhost:5173", // don't use "*"
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());

app.use(AUTH_ROUTES.AUTH.BASE, authRouter);
app.use(USER_ROUTES.USER.BASE, userRouter);
app.use("/api/message", chatRouter);
app.use("api/notification", notificationRouter);

app.use(errorHandler);

app.get("/", function (req, res) {
  res.status(200).send(
    `<div style="width:calc(100vw-8px);height:98vh;border-radius:1rem;margin:0;display:flex;justify-content:center;align-items:center;font-size:6rem;font-family:system-ui;background-color:black;color:white;">
      <span style="text-align:center;">Welcome <br> to <br> ⚡BOLT <br> Backend Home</span></div>`
  );
});

export default app;
