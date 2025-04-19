import React from "react";
import ChatWindow from "../chat/ChatWindow";

function Main() {
  return (
    <section className="sm:block flex-1 h-screen bg-gray-100 dark:bg-gray-700">
      <ChatWindow />
    </section>
  );
}

export default Main;
