import { createSlice } from "@reduxjs/toolkit";
import { PendingList } from "../../components/mainPannel/contact/PendingList";
import { FriendsList } from "../../components/mainPannel/contact/FriendsList";
import { RequestList } from "../../components/mainPannel/contact/RequestList";
import { BlockedList } from "../../components/mainPannel/contact/BlockList";

export const currWindow = {
  pending: PendingList,
  friends: FriendsList,
  requests: RequestList,
  blocked: BlockedList,
};
const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    activeHeader: "pending",
  },
  reducers: {
    setActiveHeader: (state, action) => {
      state.activeHeader = action.payload;
    },
  },
});

export default contactSlice.reducer;

export const { setActiveHeader } = contactSlice.actions;
