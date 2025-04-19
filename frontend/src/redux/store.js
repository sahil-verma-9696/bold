// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import chatAreaSlice from "../features/chat/chatAreaSlice";
import lobbySlice from "../pages/protected/lobby/lobbySlice";
import userSlice from "../features/user/userSlice";
import userProfileSlice from "../features/user/userProfileSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatAreaSlice,
    lobby: lobbySlice,
    user: userSlice,
    userProfile: userProfileSlice,
  },
});
