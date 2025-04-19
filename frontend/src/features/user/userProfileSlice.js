import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    toggleProfile: (state, action) => {
      if (state.userProfile?._id === action.payload?._id) {
        state.userProfile = null;
      } else {
        state.userProfile = action.payload;
      }
    },
    hideProfile: (state) => {
      state.userProfile = null;
    },
  },
});

export const { toggleProfile,hideProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
