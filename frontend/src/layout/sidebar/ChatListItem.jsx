import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/slices/chatSlice";
import { useEffect } from "react";
import Avatar from "../../components/ui/Avatar";
import { useNavigate } from "react-router-dom";

export function ChatListItem({online, user }) {
  const selectedUserId = useSelector((store) => store.chat.selectedUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Load selectedUserId from localStorage on mount
  useEffect(() => {
    const storedUserId = window.localStorage.getItem("selectedUserId");
    if (storedUserId) {
      dispatch(setSelectedUser(storedUserId));
    }
  }, [dispatch, selectedUserId]);

  function onSelectUser(userId) {
    window.localStorage.setItem("selectedUserId", userId);
    navigate("/auth/chat")
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
      <div className="size-12 bg-gray-400 dark:bg-gray-600 rounded-full flex items-center justify-center">
        {user.avatar ? (
          <Avatar online={online} avatar={user.avatar} />
        ) : (
          <User className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </div>
      <div>
        <h2 className="font-bold text-lg">{user.name}</h2>
        <p className="font-thin textarea-sm">
          last seen:<time> 2 hours ago</time>
        </p>
      </div>
    </li>
  );
}
