import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageSquare, User } from "lucide-react";
import { apiRequest } from "../../utils/apiHelper";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../../redux/slices/chatSlice";
import { ChatListItem } from "./ChatListItem";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useSocket } from "../../context/SocketContext";

// Chat List Component
export function ChatList({ onSelectUser }) {
  const dispatch = useDispatch();
  useAllUsers();
  const users = useSelector((store) => store.chat.allUsers);
  const onlineUsersId = useSelector((store) => store.chat.onlineUser);

  const onlineUsers = users.filter((user) => onlineUsersId.includes(user._id));

  console.log(onlineUsersId);

  return (
    <div className="w-80 border-r border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-base-100 h-screen p-4 overflow-y-scroll">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Chats
      </h2>
      <ul className="space-y-2">
        {users?.map((user) => (
          <ChatListItem
            online={onlineUsersId.includes(user._id)}
            key={user._id}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
}

// Chat Header Component
export function ChatHeader({ selectedUser, onBack }) {
  return (
    <div className="p-4 flex items-center gap-4 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900">
      <button
        onClick={onBack}
        className="p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800"
      >
        <ArrowLeft className="w-6 h-6 text-gray-900 dark:text-gray-100" />
      </button>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center">
          {selectedUser?.avatar ? (
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-full h-full rounded-full"
            />
          ) : (
            <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </div>
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {selectedUser?.name || "Select a chat"}
        </span>
      </div>
    </div>
  );
}
