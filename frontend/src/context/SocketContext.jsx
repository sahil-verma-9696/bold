import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import {
  setLastSeen,
  setMessages,
  setOnlineUser,
} from "../redux/slices/chatSlice";
import { data } from "react-router-dom";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      const existingSocketId = localStorage.getItem("socketId"); // Restore previous session ID

      const newSocket = io("http://localhost:5000", {
        withCredentials: true,
        query: { userId },
        reconnection: true, // Enable auto-reconnect
        reconnectionAttempts: 10, // Retry 10 times
        reconnectionDelay: 2000, // Wait 2 seconds before retrying
      });

      newSocket.on("connect", () => {
        console.log("✅ Reconnected with Socket ID:", newSocket.id);
        localStorage.setItem("socketId", newSocket.id); // Store new socket ID
      });

      newSocket.on("disconnect", () => {
        console.log("❌ Socket disconnected");
      });

      newSocket.on("connect_error", (err) => {
        console.error("❌ Connection error:", err.message);
      });

      newSocket.on("newMessage", (message) => {
        console.log("📩 New Message:", message);
        dispatch(setMessages(message));
      });

      newSocket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUser(onlineUsers));
      });

      newSocket.on("lastseen", (data) => {
        dispatch(setLastSeen(data));
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [dispatch]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
