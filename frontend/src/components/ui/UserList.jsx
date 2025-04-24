import React from "react";
import UserListItem from "./UserListItem";
import { useDispatch } from "react-redux";
import { setReceiver } from "../../features/chat/chatAreaSlice";

const UserList = ({ userList }) => {
  const dispatch = useDispatch();
  if (!userList) return null;
  return (
    <ul className="p-1 h-full">
      {userList.map((user) => (
        <UserListItem
          onClick={() => dispatch(setReceiver(user))}
          key={user._id}
          user={user}
        />
      ))}
    </ul>
  );
};

export default UserList;
