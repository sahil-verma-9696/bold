import io from "socket.io-client";
import createSocketIoMiddleware from "redux-socket.io";

let socket = null;

const userId = window.localStorage.getItem("userId") || " ";

export const createSocketMiddleware = (url, store) => {
  socket = io(url, {
    withCredentials: true,
    query: { userId },
    reconnection: true,
    reconnectionAttempts: 3,
    reconnectionDelay: 2000,
  });

  socket.on("connect", () => {
    console.log("✅ Socket connected after login");
    store.dispatch({ type: "socket/connected" });
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
    store.dispatch({ type: "socket/disconnected" });
  });

  return createSocketIoMiddleware(socket, "server/");
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("🛑 Socket manually disconnected at logout");
  }
};

export const getSocket = () => socket;
