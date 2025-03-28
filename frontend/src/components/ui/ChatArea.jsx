import React, { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { useDispatch, useSelector } from "react-redux";
import { settingFetchedMessages } from "../../redux/slices/chatSlice";
import { apiRequest } from "../../utils/apiHelper";

function ChatArea({ selectedUser }) {
  const messages = useSelector((store) => store.chat.messages);
  const dipatch = useDispatch();
  const messagesEndRef = useRef(null);
  async function handleGetMessages() {
    if (!selectedUser) return;
    try {
      const data = await apiRequest(`/api/messages/${selectedUser._id}`, "GET");
      console.log(data);
      dipatch(settingFetchedMessages(data.payload));
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(
    function () {
      handleGetMessages();
    },
    [selectedUser]
  );
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex-1 overflow-y-auto  text-white">
      {false && (
        <p className="text-gray-400">Chat messages will appear here...</p>
      )}
      {/* <div>hello</div> */}
      {messages.map((message) => (
        <ChatBubble
          right={!(message.senderId === selectedUser._id)}
          message={message}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatArea;
