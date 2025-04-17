import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessages } from "./chatService";

// Async thunk for fetching messages
export const messages = createAsyncThunk(
  "chat/messages",
  async (receiverId, { rejectWithValue }) => {
    try {
      const data = await getMessages(receiverId);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetching messages failed"
      );
    }
  }
);

const chatAreaSlice = createSlice({
  name: "chat",
  initialState: {
    receiver: null,
    messages: [],
    onlineUser: [],
    allUsers: [],
    lastSeen: [],
    loadingMessages: false,
    errorMessages: null,
  },
  reducers: {
    setReceiver: (state, action) => {
      state.receiver = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = [...state.messages, action.payload];
    },
    settingFetchedMessages: (state, action) => {
      state.messages = action.payload;
    },
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setOnlineUser: (state, action) => {
      state.onlineUser = action.payload;
    },
    setLastSeen: (state, action) => {
      state.lastSeen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(messages.pending, (state) => {
        state.loadingMessages = true;
        state.errorMessages = null;
      })
      .addCase(messages.fulfilled, (state, action) => {
        state.loadingMessages = false;
        state.messages = action.payload.messages;
      })
      .addCase(messages.rejected, (state, action) => {
        state.loadingMessages = false;
        state.errorMessages = action.payload;
      });
  },
});

export const {
  setReceiver,
  setMessages,
  settingFetchedMessages,
  setAllUsers,
  setOnlineUser,
  setLastSeen,
} = chatAreaSlice.actions;

export default chatAreaSlice.reducer;
