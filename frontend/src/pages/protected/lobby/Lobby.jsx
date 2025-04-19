import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/pannels/Sidebar";
import Context from "../../../components/pannels/Context";
import Main from "../../../components/pannels/Main";
import { getSocket } from "../../../redux/middlewares/socket";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../features/auth/authSlice";
import { useMediaQuery } from "react-responsive";
function Lobby() {
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.chat.receiver);

  useEffect(() => {
    const socket = getSocket();

    const handleUserUpdate = (res) => {
      console.log("User update received");
      console.log(res);

      dispatch(setUser(res.payload)); // ✅ Use a proper Redux action
    };

    socket.on("user:friend-request", (data) => {
      console.log(data);
    });

    socket.on("user:update", handleUserUpdate);

    // ✅ Clean up to prevent memory leaks
    return () => {
      socket.off("user:update", handleUserUpdate);
    };
  }, [dispatch]);
  const isDesktop = useMediaQuery({ minWidth: 640 });
  const mode = useSelector((state) => state.lobby.mobileMode);
  return (
    <>
      {!isDesktop ? (
        <div className="h-screen flex flex-col bg-red-400">
          {!isDesktop && mode === "messaging" && <Main />}
          {!isDesktop && mode === "chats" && <Context />}
          {!isDesktop && mode === "chats" && <Sidebar />}
        </div>
      ) : (
        <div className="flex">
          <Sidebar />
          <Context />
          <Main />
        </div>
      )}
    </>
  );
}

export default Lobby;
