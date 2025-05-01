import React, { useCallback } from "react";
import Avatar from "./Avatar";
import { lastSeenFormate } from "../../utils/lastSeenFormate";
import { useSelector } from "react-redux";
import { Check, Plus, TimerIcon, User, X } from "lucide-react";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from "../../features/user/userService";
import { getUserType } from "../../utils/getUserType";

const UserListItem = ({ user, mode = "normal", css, ...props }) => {
  const onlineUsers = useSelector((state) => state.user.onlineUsers);
  if (!user) return null;
  return (
    <li
      {...props}
      className={`flex justify-between items-center  px-2 py-2 cursor-pointer  dark:text-white ${css}`}
    >
      <div className="flex gap-2 items-center">
        <Avatar
          img={user.avatar}
          size="sm"
          showOnline={onlineUsers.includes(user._id)}
        />
        <div className="flex flex-col">
          <span className="text-lg">{user.name}</span>
          {!(mode === "search") ? (
            <span className="text-sm text-gray-400 font-thin">
              {onlineUsers.includes(user._id)
                ? user.email
                : lastSeenFormate(user?.lastSeen)}
            </span>
          ) : (
            <span className="text-sm text-gray-400 font-thin">
              {user.email}
            </span>
          )}
        </div>
      </div>
      <Action user={user} />
    </li>
  );
};

function Action({ user }) {
  console.log(user._id);
  const type = getUserType(user._id);

  const handleFriendRequest = useCallback(
    async (e) => {
      e.stopPropagation();
      sendFriendRequest(user._id);
    },
    [user._id]
  );

  const handleAccept = useCallback(
    async (e) => {
      e.stopPropagation();
      acceptFriendRequest(user._id);
    },
    [user._id]
  );

  const handleReject = useCallback(
    async (e) => {
      e.stopPropagation();
      rejectFriendRequest(user._id);
    },
    [user._id]
  );
  switch (true) {
    case type === "pending":
      return <TimerIcon />;
      break;

    case type === "unknown":
      return <Plus onClick={handleFriendRequest} />;
      break;
    case type === "request":
      return (
        <span className="flex gap-4">
          <Check onClick={handleAccept} />
          <X onClick={handleReject} />
        </span>
      );
      break;
    case type === "me":
      return <User />;
      break;

    default:
      return null;
  }
}

export default UserListItem;
