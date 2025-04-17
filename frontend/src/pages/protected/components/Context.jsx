import React from "react";
import { useSelector } from "react-redux";
import Home from "./contextPannels/Home";
import Setting from "./contextPannels/Setting";

const componentsMap = {
  Home: <Home />,
  Setting: <Setting />,
};

function Context() {
  const { selectedChannel } = useSelector((store) => store.lobby);

  return (
    <section className="min-w-1/7 shrink-0  bg-gray-100 dark:bg-gray-800 dark:text-white">
      {componentsMap[selectedChannel] || (
        <p className="text-gray-500">Select a valid channel</p>
      )}
    </section>
  );
}

export default Context;
