import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
  name: "main_pannel",
  initialState: {
    window: "chat",
    contact: {
      window: "friends",
    },
  },
  reducers: {
    setWindow: function (state, action) {
      state.window = action.payload;
    },
    setContactWindow: function (state, action) {
      state.contact.window = action.payload;
    },
  },
});

export default mainSlice.reducer;
export const { setWindow, setContactWindow } = mainSlice.actions;
