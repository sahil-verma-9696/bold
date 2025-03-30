import React from "react";
import Header from "../../layout/chat/Header";
import Main from "../../layout/chat/Main";
import Footer from "../../layout/chat/Footer";
import useSelectedUser from "../../hooks/useSelectedUser";

function Chat() {
  const sender = useSelectedUser();
  console.log(sender);

  return (
    <section className="flex flex-col h-screen bg-gray-900">
      <Header sender={sender} />
      <Main sender={sender} />
      <Footer sender={sender} />
    </section>
  );
}

export default Chat;
