import React, { useState } from "react";
import ChatWindow from "../main/ChatWindow";
import Contacts from "../main/Contacts";
import { useSelector } from "react-redux";

function Main() {
  const window = useSelector(store=>store.mainPannel.window)
  const windowMap = {
    chat: <ChatWindow />,
    contact: <Contacts />,
  };

  return (
    <section className=" h-screen sm:block flex-1 bg-gray-100 dark:bg-black">
      {windowMap[window]}
    </section>
  );
}

export default Main;
