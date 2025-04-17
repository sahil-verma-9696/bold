import React from "react";
import Sidebar from "../../../components/pannels/Sidebar";
import Context from "../../../components/pannels/Context";
import Main from "../../../components/pannels/Main";

function Lobby() {
  return (
    <div className="min-h-screen grid grid-cols-[5vw_20vw_75vw] bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Context />
      <Main />
    </div>
  );
}

export default Lobby;
