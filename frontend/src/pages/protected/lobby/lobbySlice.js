import { createSlice } from "@reduxjs/toolkit";

const lobbySlice = createSlice({
  name: "lobby",
  initialState: {
    selectedChannel: "Home",
  },
  reducers: {
    setSelectedChannel: (state, action) => {
      state.selectedChannel = action.payload;
    },
  },
});

export const { setSelectedChannel } = lobbySlice.actions;

export default lobbySlice.reducer;
