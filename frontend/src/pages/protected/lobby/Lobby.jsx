import React, { useEffect, useState } from "react";
import { getSocket } from "../../../redux/middlewares/socket";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Main from "../../../components/pannels/Main";
import Sidebar from "../../../components/pannels/Sidebar";
import Left from "../../../components/pannels/Left";
import Right from "../../../components/pannels/Right";
import {
  loadFriends,
  loadPendings,
  loadRequests,
  setOnlineUser,
  updateFriends,
  updatePending,
  updateRequests,
  updateUserStatus,
} from "../../../features/user/userSlice";
function Lobby() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFriends());
    dispatch(loadPendings());
    dispatch(loadRequests());
  }, []);

  useEffect(() => {
    const socket = getSocket();

    socket.on("FR:sended", (res) => {
      console.log(res);
      dispatch(updatePending(res.payload.pendings));
    });
    socket.on("FR:received", (res) => {
      console.log(res);
      dispatch(updateRequests(res.payload.requests));
    });

    socket.on("FR:reject", (res) => {
      console.log(res);
      dispatch(updateRequests(res.payload.requests));
    });
    socket.on("FR:rejected", (res) => {
      console.log(res);
      dispatch(updatePending(res.payload.pendings));
    });

    socket.on("FR:accept", (res) => {
      console.log(res);
      dispatch(updateFriends(res.payload.friends));
      dispatch(updateRequests(res.payload.requests));
    });
    socket.on("FR:accepted", (res) => {
      console.log(res);
      dispatch(updateFriends(res.payload.friends));
      dispatch(updatePending(res.payload.pendings));
    });

    socket.on("users:online", (users) => {
      dispatch(setOnlineUser(users));
    });
    socket.on("user:offline", ({ userId, lastSeen }) => {
      dispatch(updateUserStatus({ userId, lastSeen }));
    });

    return () => {
      // socket.off("user:update");
    };
  }, [dispatch]);

  const Desktop = useMediaQuery({ minWidth: 640 });
  const mode = useSelector((state) => state.lobby.mobileMode);
  const showContext = useSelector((state) => state.sidebar.openContext);

  return (
    <>
      {!Desktop ? (
        <div className="h-screen flex flex-col bg-red-400">
          {!Desktop && mode === "messaging" && <Main />}
          {!Desktop && mode === "chats" && <Left />}
          {!Desktop && mode === "chats" && <Sidebar />}
        </div>
      ) : (
        <div className="h-screen flex items-center">
          <Sidebar />
          {showContext && <Left />}
          <Main />
          <Right />
        </div>
      )}
    </>
  );
}

export default Lobby;
