import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  acceptFriendRequest,
  getAllUsers,
  rejectFriendRequest,
  search,
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
export const searchUsers = createAsyncThunk(
  "user/searchUsers",
  async (query, { rejectWithValue }) => {
    try {
      const data = await search(query);
      console.log(data);
      
      return data;
    } catch (error) {
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
    onlineUsers: [],
    filteredUsers: [],
    searchQuery: "",
    loading: false,
    error: null,
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = "";
      state.filteredUsers = [];
    },
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
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.filteredUsers = action.payload;
      });
  },
});

export const { setSearchQuery, clearSearch, setOnlineUser, updateUserStatus } =
  userSlice.actions;
export default userSlice.reducer;
