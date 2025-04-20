import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMessages } from "./chatService";
import { getSocket } from "../../redux/middlewares/socket";

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
    setLastSeen: (state, action) => {
      state.lastSeen = action.payload;
    },
    markMessagesAsRead: (state, action) => {
      const updatedIds = action.payload;
      state.messages = state.messages.map((msg) =>
        updatedIds.includes(msg._id) ? { ...msg, isRead: true } : msg
      );
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
        const socket = getSocket();
        const unSeenMessages = action.payload.messages
          .filter((msg) => !msg.isRead)
          .map((msg) => msg._id);

        console.log(unSeenMessages);
        socket.emit("message:recived", {
          type: "socket:success",
          message: "message Received successfully",
          payload: {
            unSeenMessages,
          },
        });
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
  setLastSeen,
  markMessagesAsRead,
} = chatAreaSlice.actions;

export default chatAreaSlice.reducer;
