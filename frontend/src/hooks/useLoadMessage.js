import { useDispatch, useSelector } from "react-redux";
import { settingFetchedMessages } from "../redux/slices/chatSlice";
import { useEffect } from "react";
import { apiRequest } from "../utils/apiHelper";

export function useLoadMessage() {
  const dispatch = useDispatch();

  const selectedUserId = window.localStorage.getItem("selectedUserId");
  const selectedUser = useSelector((store) =>
    store.chat.allUsers.find(
      (user) => user._id === window.localStorage.getItem("selectedUserId")
    )
  );
  async function handleGetMessages() {
    if (!selectedUserId) return;
    try {
      const data = await apiRequest(`/api/messages/${selectedUserId}`, "GET");
      dispatch(settingFetchedMessages(data.payload));
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(
    function () {
      handleGetMessages();
    },
    [selectedUser]
  );
}
