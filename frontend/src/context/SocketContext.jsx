import { createContext, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { setMessages } from "../redux/slices/chatSlice";

export function useSocket() {
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Get userId
    console.log("socket : ", userId);

    if (userId) {
      const newSocket = io("http://localhost:5000", {
        withCredentials: true,
        query: { userId },
      });

      newSocket.on("connect", () => {
        console.log("✅ Socket connected with ID:", newSocket.id);
      });

      newSocket.on("disconnect", () => {
        console.log("❌ Socket disconnected");
      });

      newSocket.on("connect_error", (err) => {
        console.error("❌ Connection error:", err.message);
      });

      newSocket.on("newMessage", (message) => {
        console.log("newMessage event triggered: ", message);
        dispatch(setMessages(message));
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [dispatch]);

  return socket;
}
