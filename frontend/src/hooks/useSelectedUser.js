import React from "react";
import { useSelector } from "react-redux";

function useSelectedUser() {
  const selectedUser = useSelector((store) =>
    store.chat.allUsers.find(
      (user) => user._id === window.localStorage.getItem("selectedUserId")
    )
  );
  return selectedUser;
}

export default useSelectedUser;
