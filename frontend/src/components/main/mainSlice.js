import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main_pannel",
  initialState: {
    window: "chat",
  },
  reducers: {
    setWindow: function (state, action) {
      state.window = action.payload;
    },
  },
});

export default mainSlice.reducer;
export const { setWindow } = mainSlice.actions;
