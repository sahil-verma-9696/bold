import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  acceptFriendRequest,
  getAllUsers,
  rejectFriendRequest,
  sendFriendRequest,
} from "./userService";
import { setUser } from "../auth/authSlice";

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

export const userFriendRequest = createAsyncThunk(
  "user/sendFriendRequest",
  async (receiverId, { rejectWithValue, dispatch }) => {
    try {
      const data = await sendFriendRequest(receiverId);
      // dispatch(setUser(data.user));
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Sending friend request failed"
      );
    }
  }
);
export const userAcceptFriendRequest = createAsyncThunk(
  "user/acceptFriendRequest",
  async (receiverId, { rejectWithValue, dispatch }) => {
    try {
      const data = await acceptFriendRequest(receiverId);
      // dispatch(setUser(data.user));
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Accepting friend request failed"
      );
    }
  }
);
export const userRejectFriendRequest = createAsyncThunk(
  "user/acceptFriendRequest",
  async (receiverId, { rejectWithValue, dispatch }) => {
    try {
      const data = await rejectFriendRequest(receiverId);
      // dispatch(setUser(data.user));
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Accepting friend request failed"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    onlineUsers: [],
    loading: false,
    error: null,
  },
  reducers: {
    setOnlineUser: function (state, action) {
      state.onlineUsers = action.payload;
    },
    updateUserStatus: function (state, action) {
      const { userId, lastSeen } = action.payload;

      const index = state.users.findIndex((user) => user._id === userId);
      if (index !== -1 && lastSeen) {
        state.users[index].lastSeen = lastSeen;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
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

export const { setOnlineUser, updateUserStatus } = userSlice.actions;
export default userSlice.reducer;
