import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  loadFriends,
  setOnlineUser,
  updateUserStatus,
} from "../../features/user/userSlice";
import { getSocket } from "../../redux/middlewares/socket";
import { messages, setReceiver } from "../../features/chat/chatAreaSlice";
import { useMediaQuery } from "react-responsive";
import SearchUser from "../user/SearchUser";
import UserList from "../ui/UserList";

const Home = () => {
  const dispatch = useDispatch();
  const { isFriendsLoaded, friends } = useSelector((store) => store.user);

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
      <UserList userList={friends} />
    </div>
  );
};

export default Home;
