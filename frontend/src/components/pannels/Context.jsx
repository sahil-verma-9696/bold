import React from "react";
import { useSelector } from "react-redux";
import Home from "../context/Home";
import Setting from "../context/Setting";
import { useMediaQuery } from "react-responsive";

const componentsMap = {
  Home: <Home />,
  Setting: <Setting />,
};

function Context() {
  const { selectedChannel } = useSelector((store) => store.lobby);
  const isDesktop = useMediaQuery({ minWidth: 640 });

  return (
    <section
      className={`${!isDesktop && "shrink-0 w-full flex-1"}
      +  ${
        isDesktop && "w-[330px]"
      } +  bg-gray-100 dark:bg-gray-800 dark:text-white
      `}
    >
      {componentsMap[selectedChannel] || (
        <p className="text-gray-500">Select a valid channel</p>
      )}
    </section>
  );
}

export default Context;
