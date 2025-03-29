import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    selectedUser: null,
    messages: [],
    onlineUser: [],
    allUsers: [],
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    settingFetchedMessages: (state, action) => {
      state.messages = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const {
  setSelectedUser,
  setMessages,
  settingFetchedMessages,
  setAllUsers,
} = chatSlice.actions;
export default chatSlice.reducer;
