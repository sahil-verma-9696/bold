import React, { useCallback } from "react";
import Avatar from "../ui/Avatar";
import { useSelector } from "react-redux";
import { Plus } from "lucide-react";
import { sendFriendRequest } from "../../features/user/userService";

const SearchUserListItem = ({ user }) => {
  const onlineUsers = useSelector((store) => store.user.onlineUsers);
  const { friends, pending } = useSelector((store) => store.auth.user);
  const handleFriendRequest = useCallback(
    async (e) => {
      e.stopPropagation();
      sendFriendRequest(user._id);
    },
    [user._id]
  );
  return (
    <li className="flex justify-between items-center w-full gap-2 px-2 py-2 cursor-pointer hover:dark:bg-gray-900 dark:text-white">
      <div className="flex ">
        <Avatar
          img={user.avatar}
          size="sm"
          showOnline={onlineUsers.includes(user._id)}
        />
        <div className="flex flex-col">
          <span className="text-lg">{user.name}</span>
          <span className="text-sm text-gray-400 font-thin">{user.email}</span>
        </div>
      </div>

      {!friends.includes(user._id) && !pending.includes(user._id) && (
        <Plus onClick={handleFriendRequest} />
      )}
    </li>
  );
};

export default SearchUserListItem;
