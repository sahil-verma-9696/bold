import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers,
  getFriends,
  getPendings,
  getRequests,
  search,
} from "./userService";
import { apiRequest } from "../../utils/apiHelper";

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

export const loadSearchResults = createAsyncThunk(
  "user/loadSearchResults",
  async (query, { rejectWithValue }) => {
    try {
      const data = await search(query);
      return data;
    } catch (error) {
      return rejectWithValue(
        err.response?.data?.message || "Fetching search users failed"
      );
    }
  }
);

export const loadFriends = createAsyncThunk(
  "user/friends",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFriends();
      return data;
    } catch (error) {
      return rejectWithValue(
        err.response?.data?.message || "Fetching user's friends failed"
      );
    }
  }
);

export const loadPendings = createAsyncThunk(
  "user/pending",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getPendings();
      return data;
    } catch (error) {
      return rejectWithValue(
        err.response?.data?.message || "Fetching user's pending failed"
      );
    }
  }
);

export const loadRequests = createAsyncThunk(
  "user/requests",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getRequests();
      return data;
    } catch (error) {
      return rejectWithValue(
        err.response?.data?.message || "Fetching user's pending failed"
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
    friends: [],
    pendings: [],
    requests: [],
    isFriendsLoaded: false,
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
      .addCase(loadSearchResults.fulfilled, (state, action) => {
        state.filteredUsers = action.payload;
      })
      .addCase(loadSearchResults.rejected, (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
      })
      .addCase(loadFriends.pending, (state) => {
        state.loading = true;
        state.isFriendsLoaded = false;
        state.error = null;
      })
      .addCase(loadFriends.fulfilled, (state, action) => {
        state.friends = action.payload.friends;
        state.loading = false;
        state.isFriendsLoaded = true;
      })
      .addCase(loadFriends.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(loadPendings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadPendings.fulfilled, (state, action) => {
        state.pendings = action.payload.pending;
        state.loading = false;
      })
      .addCase(loadPendings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadRequests.fulfilled, (state, action) => {
        state.requests = action.payload.requests;
        state.loading = false;
      })
      .addCase(loadRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery, clearSearch, setOnlineUser, updateUserStatus } =
  userSlice.actions;
export default userSlice.reducer;
