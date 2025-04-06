import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    selectedUser: null,
    messages: [],
    onlineUser: [],
    allUsers: [],
    lastSeen: [],
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
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
    setLastSeen: (state, action) => {
      console.log(action.payload);
      state.lastSeen = action.payload;
    },
  },
});

export const {
  setSelectedUser,
  setMessages,
  settingFetchedMessages,
  setAllUsers,
  setOnlineUser,
  setLastSeen,
} = chatSlice.actions;
export default chatSlice.reducer;
