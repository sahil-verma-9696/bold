import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { ROUTES as AUTH_ROUTES } from "./modules/auth/constants.js";
import { ROUTES as USER_ROUTES } from "./modules/user/constants.js";
import { router as authRouter } from "./modules/auth/user.routes.js";
import { router as userRouter } from "./modules/user/user.routes.js";

import cors from "cors";

config();

const app = express();
// const httpServer = createServer(app);

// ✅ Enable CORS for Frontend (Adjust origin as needed)
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
// app.use(ROUTES.MESSAGE.BASE, messageRouter);
// app.use(ROUTES.TEAM.BASE, teamRouter);

app.get("/", function (req, res) {
  res
    .status(200)
    .send(
      `<h1 style="font-size:2 rem; position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">Welcome to CollabHub Backend Home</h1>`
    );
});

export default app;
