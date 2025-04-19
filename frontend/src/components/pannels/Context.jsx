import React from "react";
import { useSelector } from "react-redux";
import Home from "../context/Home";
import Setting from "../context/Setting";

const componentsMap = {
  Home: <Home />,
  Setting: <Setting />,
};

function Context() {
  const { selectedChannel } = useSelector((store) => store.lobby);

  return (
    <section className="shrink-0 w-full flex-1  sm:w-[37%] lg:w-[25%] bg-gray-100 dark:bg-gray-800 dark:text-white">
      {componentsMap[selectedChannel] || (
        <p className="text-gray-500">Select a valid channel</p>
      )}
    </section>
  );
}

export default Context;
