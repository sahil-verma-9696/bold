// store.js
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import chatAreaSlice from "../features/chat/chatAreaSlice";
import lobbySlice from "./slices/lobbySlice";
import userSlice from "../features/user/userSlice";
import userProfileSlice from "../features/user/userProfileSlice";
import sidebarSlice from "./slices/sidebar";
import mainPannelSlice from "./slices/mainSlice";
import leftPannelSlice from "./slices/leftPannel";
import contactSlice from "./slices/contactSlice";
import rightPannelSlice from "./slices/rightPannel";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    chat: chatAreaSlice,

    lobby: lobbySlice,

    sidebar: sidebarSlice,
    leftPannel: leftPannelSlice,
    mainPannel: mainPannelSlice,
    rightPannel: rightPannelSlice,

    contacts: contactSlice,

    userProfile: userProfileSlice,
  },
});
