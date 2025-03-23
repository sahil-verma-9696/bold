import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Store user details in Redux
    },
    clearUser: (state) => {
      state.user = null; // Clear user on logout or auth failure
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
