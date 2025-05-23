import { createSlice } from "@reduxjs/toolkit";
import Group from "../../components/leftPannel/Group";
import ChatsList from "../../components/leftPannel/ChatsList";

export const leftPannels = {
  chats: ChatsList,
  contact: ChatsList,
  group: Group,
};

const leftPannelSlice = createSlice({
  name: "leftPannelSlice",
  initialState: {
    pannel: "chats",
    chatsList: [],
  },
  reducers: {
    setLeftPannel: (state, action) => {
      state.pannel = action.payload;
    },
  },
});

export default leftPannelSlice.reducer;
export const { setLeftPannel } = leftPannelSlice.actions;
