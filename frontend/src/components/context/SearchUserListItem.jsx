import React from "react";
import Avatar from "../ui/Avatar";
import { useSelector } from "react-redux";

const SearchUserListItem = ({ user }) => {
  const onlineUsers = useSelector((store) => store.user.onlineUsers);
  return (
    <li className="flex gap-2 px-2 py-2 cursor-pointer hover:dark:bg-gray-900 dark:text-white">
      <Avatar
        img={user.avatar}
        size="sm"
        showOnline={onlineUsers.includes(user._id)}
      />
      <div className="flex flex-col">
        <span className="text-lg">{user.name}</span>
        <span className="text-sm text-gray-400 font-thin">{user.email}</span>
      </div>
    </li>
  );
};

export default SearchUserListItem;
