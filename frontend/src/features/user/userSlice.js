import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./userService";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllUsers();
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetching users failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log(action.payload);
        state.users = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default userSlice.reducer;
