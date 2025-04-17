import React from "react";
import Sidebar from "../components/Sidebar";
import Context from "../components/contextPannels/Context";
import { getSocket } from "../../../redux/middlewares/socket";

function Lobby() {
  const socket = getSocket();
  console.log(socket);

  socket.on("getOnlineUsers", function (data) {
    console.log("backend", data);
  });
  function handleClick() {
    socket.emit("getOnlineUsers", {
      userId: socket.id,
    });
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Context />
      <section className="flex-1 p-4 bg-gray-100 dark:bg-gray-700">
        part3
        <button onClick={handleClick}>click me </button>
      </section>
    </div>
  );
}

export default Lobby;
