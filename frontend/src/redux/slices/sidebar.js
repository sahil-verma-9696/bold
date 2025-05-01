import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    openContext: true,
    openMeProfile: false,
  },
  reducers: {
      toggleContext: (state) => {
        state.openContext = !state.openContext;
      },
    toggleMeProfile: (state) => {
      state.openMeProfile = !state.openMeProfile;
    },
  },
});

export const { toggleMeProfile, toggleContext } = sidebarSlice.actions;
export default sidebarSlice.reducer;
