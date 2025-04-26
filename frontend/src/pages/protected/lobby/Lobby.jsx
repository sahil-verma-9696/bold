import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/pannels/Sidebar";
import Context from "../../../components/pannels/Context";
import Main from "../../../components/pannels/Main";
import { getSocket } from "../../../redux/middlewares/socket";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../features/auth/authSlice";
import { useMediaQuery } from "react-responsive";
import RightPannel from "../../../components/pannels/RightPannel";
function Lobby() {
  const dispatch = useDispatch();
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
