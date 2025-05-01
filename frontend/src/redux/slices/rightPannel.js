import { createSlice } from "@reduxjs/toolkit";

const rightPannelSlice = createSlice({
  name: "rightPannel",
  initialState: {
    user: null,
  },
  reducers: {
    setRightPannelUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export default rightPannelSlice.reducer;

export const { setRightPannelUser } = rightPannelSlice.actions;
