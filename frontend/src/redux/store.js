// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./../features/auth/authSlice";
import chatSlice from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
  },
});
