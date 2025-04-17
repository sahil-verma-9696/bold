import React from "react";
import { useSelector } from "react-redux";
import Home from "./Home";
import Setting from "./Setting";
import Chat from "./Chat";

const componentsMap = {
  Home: <Home />,
  Setting: <Setting />,
  Chat: <Chat />,
};

function Context() {
  const { selectedChannel } = useSelector((store) => store.lobby);

  return (
    <section className="w-1/7  bg-gray-100 dark:bg-gray-800 dark:text-white">
      {componentsMap[selectedChannel] || (
        <p className="text-gray-500">Select a valid channel</p>
      )}
    </section>
  );
}

export default Context;
