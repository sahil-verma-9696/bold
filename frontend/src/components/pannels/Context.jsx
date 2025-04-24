import React from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Home from "../context/Home";
import Group from "../context/Group";
import SearchUser from "../user/SearchUser";

const componentsMap = {
  Home: <Home />,
  Group: <Group />,
};

function Context() {
  const { selectedChannel } = useSelector((store) => store.lobby);
  const isDesktop = useMediaQuery({ minWidth: 640 });

  return (
    <section className="h-screen bg-gray-100 dark:bg-black dark:text-white border-r">
      <div className="h-[70px] dark:bg-[#131416] flex items-center px-2">
        <h1 className="text-4xl font-semibold">⚡Bolt</h1>
      </div>
      <SearchUser />
      {componentsMap[selectedChannel] || (
        <p className="text-gray-500 size-full flex justify-center items-center dark:text-white text-2xl">
          {selectedChannel} Not Available
        </p>
      )}
    </section>
  );
}

export default Context;
