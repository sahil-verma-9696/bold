import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadFriends,
  setOnlineUser,
  updateUserStatus,
} from "../../features/user/userSlice";
import { getSocket } from "../../redux/middlewares/socket";
import UserListItem from "../ui/UserListItem";
import { setReceiver } from "../../features/chat/chatAreaSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { isFriendsLoaded, friends } = useSelector((store) => store.user);
  const receiver = useSelector((state) => state.chat.receiver);

  useEffect(() => {
    if (!isFriendsLoaded) {
      dispatch(loadFriends());
    }
  }, []);

  useEffect(() => {
    const socket = getSocket();

    socket.on("users:online", (users) => {
      dispatch(setOnlineUser(users));
    });

    socket.on("user:offline", ({ userId, lastSeen }) => {
      dispatch(updateUserStatus({ userId, lastSeen }));
    });

    return () => {
      socket.off("users:online");
      socket.off("user:offline");
    };
  }, [dispatch]);

  return (
    <div className="h-[84vh] overflow-y-scroll">
      <ul className="p-1 h-full">
        {friends?.map((user) => (
          <UserListItem
            onClick={() => dispatch(setReceiver(user))}
            key={user._id}
            user={user}
            css={`hover:dark:bg-gray-900 ${
              receiver._id === user._id ? "bg-gray-100 dark:bg-gray-800" : ""
            }`}
          />
        ))}
      </ul>
    </div>
  );
};

export default Home;
