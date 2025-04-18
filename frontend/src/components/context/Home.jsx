import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, X } from "lucide-react";
import {
  getUsers,
  setOnlineUser,
  updateUserStatus,
} from "../../features/user/userSlice";
import { messages, setReceiver } from "../../features/chat/chatAreaSlice";
import { getSocket } from "../../redux/middlewares/socket";
import { lastSeenFormate } from "../../utils/lastSeenFormate";

function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  const users = useSelector((store) => store.user.users);
  const receiver = useSelector((store) => store.chat.receiver);
  const onlineUsers = useSelector((store) => store.user.onlineUsers);

  function handleSetReceiver(user) {
    if (receiver?.email === user.email) {
      dispatch(setReceiver(null));
    } else {
      dispatch(setReceiver(user));
      dispatch(messages(user._id));
    }
  }



    const socket = getSocket();
  
    socket.on("getOnlineUsers", (users) => {
      // console.log("online users ",users);
      
      dispatch(setOnlineUser(users)); 
    });
  
    socket.on("user:offline", ({ userId, lastSeen }) => {
      dispatch(updateUserStatus({ userId, lastSeen }));

    });
  
  return (
    <div className="py-4">
      <section className="bg-gray-700 px-2 py-1">
        <h1>All users</h1>
      </section>
      <ul className="">
        {users?.map((user) => {
          const isSelected = receiver?.email === user.email;

          return (
            <li
              onClick={() => handleSetReceiver(user)}
              key={user?.email}
              className={`flex justify-between items-center hover:bg-gray-700 p-2 rounded-md cursor-pointer select-none transition-all duration-200 ${
                isSelected
                  ? "border-l-4 border-l-gray-900 bg-gray-700"
                  : "border-l-4 border-l-transparent"
              }`}
            >
              <div className="flex gap-2 items-center">
                <div className="relative">
                  <img
                    src="https://res.cloudinary.com/dfqdx3ieb/image/upload/v1742281653/default_user.png"
                    className="size-12 rounded-full border-2 border-white"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full border border-white" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-lg capitalize">{user.name}</span>
                  <span className="text-sm opacity-45">
                    <span className="text-sm opacity-45">
                      {onlineUsers.includes(user._id)
                        ? user.email
                        : lastSeenFormate(user.lastSeen)}
                    </span>
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Home;
