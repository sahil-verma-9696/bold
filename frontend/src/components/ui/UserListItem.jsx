import React from "react";
import Avatar from "./Avatar";
import { lastSeenFormate } from "../../utils/lastSeenFormate";
import { useSelector } from "react-redux";

const UserListItem = ({ user, ...props }) => {
  const onlineUsers = useSelector((state) => state.user.onlineUsers);

  if (!user) return null;
  return (
    <li
      {...props}
      className="flex gap-2 px-2 py-2 cursor-pointer hover:dark:bg-gray-900 dark:text-white"
    >
      <Avatar img={user.avatar} size="sm" showOnline={onlineUsers.includes(user._id)} />
      <div className="flex flex-col">
        <span className="text-lg">{user.name}</span>
        <span className="text-sm text-gray-400 font-thin">
          {onlineUsers.includes(user._id)
            ? user.email
            : lastSeenFormate(user.lastSeen)}
        </span>
      </div>
    </li>
  );
};

export default UserListItem;
