import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    addUser: function (state, action) {},
    removeUser: function (state, action) {},
  },
});

export const { addUser, removeUser } = userSlice.actions;

export const userReducer = userSlice.reducer;
