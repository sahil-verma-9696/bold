import React from "react";
import ChatArea from "../chat/ChatArea";

function Main() {
  return (
    <section className="hidden lg:block h-screen overflow-y-scroll bg-gray-100 dark:bg-gray-700">
      <ChatArea />
    </section>
  );
}

export default Main;
