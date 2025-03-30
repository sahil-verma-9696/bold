import React, { useEffect, useRef, useState } from "react";
import ChatBubble from "./ChatBubble";
import { MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
import { EmptyChat } from "../../components/ui/EmptyChat";
import { useLoadMessage } from "../../hooks/useLoadMessage";
import useSelectedUser from "../../hooks/useSelectedUser";

function Main({ sender }) {
  const messages = useSelector((store) => store.chat.messages);
  const currUser = useSelector((store) => store.auth.user);
  useLoadMessage();
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return <EmptyChat />;
  }
  return (
    <div className="flex-1 p-4 rounded-tl-2xl bg-base-100">
      {messages?.map((message) => (
        <ChatBubble
          key={message._id}
          senderAvatar={sender?.avatar}
          myAvatar={currUser?.avatar}
          right={message.senderId === currUser._id}
          message={message}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Main;
