// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./../features/auth/authSlice";
import chatAreaSlice from "../features/chat/chatAreaSlice";
import lobbySlice from "../pages/protected/lobby/lobbySlice";
import userSlice from "../features/user/userSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatAreaSlice,
    lobby: lobbySlice,
    user: userSlice,
  },
});
