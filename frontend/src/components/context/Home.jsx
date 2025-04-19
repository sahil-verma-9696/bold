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

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.user.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    const socket = getSocket();

    socket.on("getOnlineUsers", (users) => {
      dispatch(setOnlineUser(users));
    });

    socket.on("user:offline", ({ userId, lastSeen }) => {
      dispatch(updateUserStatus({ userId, lastSeen }));
    });

    return () => {
      socket.off("getOnlineUsers");
      socket.off("user:offline");
    };
  }, [dispatch]);

  const isDesktop = useMediaQuery({ minWidth: 640 });
  console.log(isDesktop);

  return (
    <div className="h-full">
      <section className="w-full px-2 py-1 ">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-3xl font-semibold dark:text-white">⚡Bolt</h1>
          {!isDesktop && <MoreVertical />}
        </div>
      </section>
      <ul className="h-[calc(80vh+9px)] sm:h-[calc(92vh+4px)] overflow-y-scroll">
        <div className="flex dark:text-white bg-gray-300 dark:bg-gray-700 mx-2 my-2 px-2 py-2 rounded-xl">
          <Search />
          <input
            className="flex-1 px-2 outline-0"
            type="text"
            placeholder="Search"
          />
        </div>
        {users?.map((user) => (
          <UserItem key={user.email} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
