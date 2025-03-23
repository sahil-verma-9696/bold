import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { ROUTES } from "./routes/constants.js";
import { router as authRouter } from "./routes/auth.routes.js";
import { router as userRouter } from "./routes/user.routes.js";
import { router as messageRouter } from "./routes/message.routes.js";
import { logError, logSuccess } from "./utils/logger.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./lib/database.js";
import cors from "cors";
// import { setupSockets } from "./sockets/index.js";

config();

const PORT = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

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

app.use(ROUTES.AUTH.BASE, authRouter);
app.use(ROUTES.USER.BASE, userRouter);
app.use(ROUTES.MESSAGE.BASE, messageRouter);
// app.use(ROUTES.TEAM.BASE, teamRouter);

app.get("/", function (req, res) {
  res.send(
    `<h1 style="font-size:2 rem; position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);">Welcome to CollabHub Backend Home</h1>`
  );
});

async function startServer() {
  await connectDB();
  //   setupSockets(io);
  httpServer.listen(PORT, function () {
    logSuccess(import.meta.url, `Server running on port ${PORT}`);
  });
}

startServer();
