import React, { useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";
import { useDispatch, useSelector } from "react-redux";
import { settingFetchedMessages } from "../../redux/slices/chatSlice";
import { apiRequest } from "../../utils/apiHelper";
import { MessageSquare } from "lucide-react";

function ChatArea({ selectedUserId }) {
  const messages = useSelector((store) => store.chat.messages);
  const dipatch = useDispatch();
  const messagesEndRef = useRef(null);
  async function handleGetMessages() {
    if (!selectedUserId) return;
    try {
      const data = await apiRequest(`/api/messages/${selectedUserId}`, "GET");
      console.log(data);
      console.log(messages);
      dipatch(settingFetchedMessages(data.payload));
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(
    function () {
      handleGetMessages();
    },
    [selectedUserId]
  );
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return <EmptyChat />;
  }

  return (
    <div className="flex-1 overflow-y-auto text-white">
      {false && (
        <p className="text-gray-400">Chat messages will appear here...</p>
      )}
      {/* <div>hello</div> */}
      {messages.map((message) => (
        <ChatBubble
          right={!(message.senderId === selectedUserId)}
          message={message}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

function EmptyChat() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-transparent text-white">
      <MessageSquare className="w-16 h-16 text-gray-400" />
      <p className="text-gray-400 mt-4 text-lg">Start a conversation...</p>
    </div>
  );
}

export default ChatArea;
