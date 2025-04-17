import React from "react";
import ChatArea from "./contextPannels/ChatArea";

function Main() {
  return (
    <section className="h-screen overflow-y-scroll bg-gray-100 dark:bg-gray-700 scrollbar-thin hover:scrollbar-thumb-gray-400 hover:dark:scrollbar-thumb-gray-600 scrollbar-thumb-transparent scrollbar-track-transparent">
      <ChatArea />
    </section>
  );
}

export default Main;
