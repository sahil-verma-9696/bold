import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, socket: null},
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Store user details in Redux
    },
    clearUser: (state) => {
      state.user = null; // Clear user on logout or auth failure
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    clearSocket: (state, action) => {
      state.socket = null;
    },

  },
});

export const { setUser, setSocket, clearUser, clearSocket } = authSlice.actions;
export default authSlice.reducer;
