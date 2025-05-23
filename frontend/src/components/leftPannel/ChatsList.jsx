import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFriends } from "../../features/user/userSlice";
import UserListItem from "../ui/UserListItem";
import { setReceiver } from "../../features/chat/chatAreaSlice";
import { setRightPannelUser } from "../../redux/slices/rightPannel";

export default function ChatsList() {
  const dispatch = useDispatch();
  const { friends } = useSelector((store) => store.user);
  const receiver = useSelector((store) => store.chat.receiver);

  useEffect(() => {
    dispatch(loadFriends());
  }, []);

  function handleClick(user) {
    dispatch(setReceiver(user));
    dispatch(setRightPannelUser(user));
  }

  return (
    <ul className="p-1 h-[84vh] overflow-y-scroll">
      {friends?.map((user) => (
        <UserListItem
          onClick={() => handleClick(user)}
          key={user?._id}
          user={user}
          css={`hover:dark:bg-gray-900 ${
            receiver?._id === user?._id ? "bg-gray-100 dark:bg-gray-800" : ""
          }`}
        />
      ))}
    </ul>
  );
}
