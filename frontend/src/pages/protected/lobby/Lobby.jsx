import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/pannels/Sidebar";
import Context from "../../../components/pannels/Context";
import Main from "../../../components/pannels/Main";
import { getSocket } from "../../../redux/middlewares/socket";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../features/auth/authSlice";
import { useMediaQuery } from "react-responsive";
import RightPannel from "../../../components/pannels/RightPannel";
import {
  loadFriends,
  loadPendings,
  loadRequests,
  updateFriends,
  updatePending,
  updateRequests,
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
          {!Desktop && mode === "chats" && <Context />}
          {!Desktop && mode === "chats" && <Sidebar />}
        </div>
      ) : (
        <div className="h-screen flex items-center">
          <Sidebar />
          {showContext && <Context />}
          <Main />
          <RightPannel />
        </div>
      )}
    </>
  );
}

export default Lobby;
