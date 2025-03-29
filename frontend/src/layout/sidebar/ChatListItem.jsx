import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/slices/chatSlice";
import { useEffect } from "react";

export function ChatListItem({ user }) {
  const selectedUserId = useSelector((store) => store.chat.selectedUser);
  const dispatch = useDispatch();
  
  // Load selectedUserId from localStorage on mount
  useEffect(() => {
    const storedUserId = window.localStorage.getItem("selectedUserId");
    if (storedUserId) {
      dispatch(setSelectedUser(storedUserId));
    }
  }, [dispatch]);

  function onSelectUser(userId) {
    window.localStorage.setItem("selectedUserId", userId);
    dispatch(setSelectedUser(userId));
  }
  return (
    <li
      key={user.id}
      onClick={() => onSelectUser(user._id)}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800 transition ${
        selectedUserId === user._id ? "bg-gray-200 dark:bg-gray-800" : ""
      }`}
    >
      <div className="w-10 h-10 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </div>
      <span className="text-gray-900 dark:text-gray-100">{user.name}</span>
    </li>
  );
}
