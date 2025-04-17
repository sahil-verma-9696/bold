import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Context from "../components/Context";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../features/user/userSlice";
import Main from "../components/Main";

function Lobby() {
  return (
    <div className="min-h-screen grid grid-cols-[5vw_15vw_80vw] bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Context />
      <Main/>
    </div>
  );
}

export default Lobby;
