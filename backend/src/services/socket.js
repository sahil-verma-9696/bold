import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { logInfo, logSuccess, logWarning } from "../utils/logger.js";
import { User } from "../modules/auth/user.model.js";
import app from "../app.js";
import Message from "../modules/chat/message.models.js";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173", credentials: true },
});

export function getReceiverSocketId(userId) {
  return onlineUsers[userId];
}

// used to store online users
const onlineUsers = {};

io.on("connection", async (socket) => {
  logInfo(import.meta.url, "🔌✅  User connected ID: " + socket.id);
  const userId = socket.handshake.query.userId;
  if (!userId) {
    socket.disconnect();
    return;
  }

  // Check if this user is already connected
  const existingSocketId = onlineUsers[userId];
  if (existingSocketId && existingSocketId !== socket.id) {
    logWarning(
      import.meta.url,
      `🟡 Duplicate socket detected for user ${userId}.`
    );
  }

  if (userId) onlineUsers[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(onlineUsers));

  socket.on("sendMessage", ({ senderId, receiverId, text, image }) => {
    logSuccess(import.meta.url, "Message sent");
    const messagePayload = {
      senderId,
      receiverId,
      text,
      image,
      createdAt: new Date().toISOString(),
    };

    io.to(getReceiverSocketId(receiverId)).emit(
      "receiveMessage",
      messagePayload
    );

    socket.emit("messageSent", messagePayload);

    // 3. Save to database in the background (non-blocking)
    Message.create(messagePayload).catch((err) => {
      console.error("❌ Failed to save message:", err.message);

      socket.emit("errorMessage", { message: "Failed to save message" });
    });
  });

  socket.on("disconnect", async function () {
    logInfo(import.meta.url, "🔌❌ User disconnected ID: " + socket.id);

    const userId = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id
    );

    delete onlineUsers[userId];

    console.log(onlineUsers);

    io.emit("getOnlineUsers", Object.keys(onlineUsers));

    if (userId) {
      const lastSeen = new Date();

      User.findByIdAndUpdate(userId, {
        lastSeen,
      }).catch((err) => {
        console.error("❌ Failed to update user:", err.message);
      });

      // Emit immediately (non-blocking)
      io.emit("user:offline", {
        userId,
        lastSeen,
      });
    }

    console.log("userId", userId);
  });
});

export { httpServer };
