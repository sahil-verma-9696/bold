import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js";
import chatSlice from "./slices/chatSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    chat: chatSlice,
  },
});
