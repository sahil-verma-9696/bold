import { createSlice } from "@reduxjs/toolkit";

const lobbySlice = createSlice({
  name: "lobby",
  initialState: {
    selectedChannel: "Home",
    mobileMode: "chats",
  },
  reducers: {
    setSelectedChannel: (state, action) => {
      state.selectedChannel = action.payload;
    },
    setMobileMode: (state, action) => {
      state.mobileMode = action.payload;
    },
  },
});

export const { setSelectedChannel, setMobileMode } = lobbySlice.actions;

export default lobbySlice.reducer;
