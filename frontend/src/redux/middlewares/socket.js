import io from "socket.io-client";
import createSocketIoMiddleware from "redux-socket.io";

// Declare the socket variable outside of the function to avoid re-initialization
let socket = null;

// Modify the function to only create a socket once
export const createSocketMiddleware = (url, store, userId) => {
  // Initialize socket only if it's not already created
  if (!socket) {
    socket = io(url, {
      withCredentials: true,
      query: { userId },
      reconnection: true,
      reconnectionAttempts: 3,
      reconnectionDelay: 2000,
    });

    socket.on("connect", () => {
      console.log("✅ Socket connected");
      store.dispatch({ type: "socket/connected" });
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      store.dispatch({ type: "socket/disconnected" });
    });
  }
  return createSocketIoMiddleware(socket, "server/");
};

// A function to manually disconnect the socket when needed (like on logout)
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log("🛑 Socket manually disconnected at logout");
  }
};

// Get the socket instance (for usage elsewhere in the app)
export const getSocket = () => socket;
