import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  setOnlineUser,
  updateUserStatus,
} from "../../features/user/userSlice";
import { getSocket } from "../../redux/middlewares/socket";
import UserItem from "./UserItem";
import { messages, setReceiver } from "../../features/chat/chatAreaSlice";
import { MoreVertical, Search } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import SearchUser from "../user/SearchUser";

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.user.users);

  useEffect(() => {
    dispatch(getUsers());
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

  const isDesktop = useMediaQuery({ minWidth: 640 });
  console.log(isDesktop);

  return (
    <div className="h-full">
      <ul className="h-[calc(80vh+9px)] sm:h-[calc(92vh+4px)] overflow-y-scroll">
        <SearchUser />
        {users?.map((user) => (
          <UserItem key={user.email} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
