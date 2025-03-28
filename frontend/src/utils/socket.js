import { io } from "socket.io-client";

const DEBUG = true;

export let socket = null;

export const connectSocket = ({ userId }) => {
  if (DEBUG) console.log("Hit socket with userId", userId);

  if (!socket) {
    socket = io("http://localhost:5000", {
      withCredentials: true,
      query: { userId }, // Pass userId properly
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected with ID:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Connection error:", err.message);
    });
  } else if (!socket.connected) {
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket && socket.connected) {
    socket.disconnect();
    console.log("❌ Socket disconnected");
  }
};
