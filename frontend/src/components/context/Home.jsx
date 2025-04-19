import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsers,
  setOnlineUser,
  updateUserStatus,
} from "../../features/user/userSlice";
import { getSocket } from "../../redux/middlewares/socket";
import UserItem from "./UserItem";

const Home = () => {
  const dispatch = useDispatch();
  const users = useSelector((store) => store.user.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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

  return (
    <div className="py-4">
      <section className="bg-gray-700 px-2 py-1">
        <h1>All users</h1>
      </section>
      <ul>
        {users?.map((user) => (
          <UserItem key={user.email} user={user} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
