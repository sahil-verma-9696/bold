import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { logInfo } from "../utils/logger.js";
import { User } from "../modules/auth/user.model.js";
import app from "../app.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// used to store online users
const userSocketMap = {};

io.on("connection", async (socket) => {
  logInfo(import.meta.url, "🔌🛜 User connected ID: " + socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    await User.findByIdAndUpdate(userId, { lastSeen: new Date() });
  }
  if (userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all the connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("getOnlineUsers", function (data) {
    console.log("frontend", data);
  });
  socket.on("disconnect", async function () {
    logInfo(import.meta.url, "User disconnected ID: " + socket.id);
    delete userSocketMap[userId];
    const lastSeen = new Date();

    console.log("userId", userId);
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    io.emit("lastseen", [{ userId, lastSeen }]);
    if (userId) {
      await User.findByIdAndUpdate(userId, { lastSeen: lastSeen });
    }
  });
});

export { httpServer };
