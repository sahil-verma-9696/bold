import React, { useEffect } from "react";
import Sidebar from "../../../components/pannels/Sidebar";
import Context from "../../../components/pannels/Context";
import Main from "../../../components/pannels/Main";
import { getSocket } from "../../../redux/middlewares/socket";
import { useDispatch } from "react-redux";
import { setUser } from "../../../features/auth/authSlice";

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

  return (
    <div className="min-h-screen grid grid-cols-[5vw_20vw_75vw] bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Context />
      <Main />
    </div>
  );
}

export default Lobby;
