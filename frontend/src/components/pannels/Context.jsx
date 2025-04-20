import React from "react";
import { useSelector } from "react-redux";
import Home from "../context/Home";
import Setting from "../context/Setting";
import { useMediaQuery } from "react-responsive";
import { MoreVertical } from "lucide-react";
import Search from "../context/Search";

const componentsMap = {
  Home: <Home />,
  Setting: <Setting />,
  Search: <Search />,
};

function Context() {
  const { selectedChannel } = useSelector((store) => store.lobby);
  const isDesktop = useMediaQuery({ minWidth: 640 });

  return (
    <section
      className={`${!isDesktop && "shrink-0 w-full flex-1"}
      +  ${
        isDesktop && "w-[330px]"
      } + h-screen bg-gray-100 dark:bg-gray-800 dark:text-white
      `}
    >
      {/* <section className="w-full px-2 py-1 ">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-3xl font-semibold dark:text-white">⚡Bolt</h1>
          {!isDesktop && <MoreVertical />}
        </div>
      </section> */}
      {componentsMap[selectedChannel] || (
        <p className="text-gray-500 size-full flex justify-center items-center dark:text-white text-2xl">
          {selectedChannel} Not Available
        </p>
      )}
    </section>
  );
}

export default Context;
