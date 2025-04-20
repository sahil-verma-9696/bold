import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartArea, MessageSquareOff, Users } from "lucide-react";
import { getSocket } from "../../redux/middlewares/socket";
import {
  markMessagesAsRead,
  setMessages,
  setReceiver,
} from "../../features/chat/chatAreaSlice";

import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { messages as loadMessages } from "../../features/chat/chatAreaSlice";

function ChatWindow() {
  const [message, setMessage] = useState("");
  const socket = getSocket();
  const dispatch = useDispatch();
  const receiver = useSelector((state) => state.chat.receiver);
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.auth.user); // Assuming logged-in user info is in auth slice
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const reciver = JSON.parse(localStorage.getItem("receiver"));
    if (reciver._id) {
      dispatch(setReceiver(reciver));
      dispatch(loadMessages(reciver._id));
    }
  }, []);

  useEffect(() => {
    const socket = getSocket();

    const handleRead = ({ updatedIds, updatedCount }) => {
      dispatch(markMessagesAsRead(updatedIds));
      console.log("messages seen", updatedCount);
    };

    socket.on("message:readed", handleRead);

    return () => {
      socket.off("message:readed", handleRead);
    };
  }, []);

  // Listen for incoming messages
  useEffect(() => {
    if (receiver?._id) {
    }

    if (!socket) return;

    const handleReceiveMessage = (data) => {
      dispatch(setMessages(data));
    };

    socket.on("message:receive-updateToSender", handleReceiveMessage);

    return () => {
      socket.off("message:receive-updateToSender", handleReceiveMessage);
    };
  }, [socket, dispatch]);

  // Handle send
  const handleSend = () => {
    if (message.trim() === "" || !receiver) return;

    const payload = {
      senderId: user._id,
      receiverId: receiver._id,
      text: message,
      image: null, // You can integrate image upload later
    };

    socket.emit("message:send-updateToReceiver", payload);
    dispatch(setMessages({ ...payload, createdAt: new Date().toISOString() }));

    setMessage("");
  };

  if (!receiver) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-center p-4">
        <Users className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
        <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
          No user selected
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please select a user from the sidebar to start chatting.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader receiver={receiver} />
      {messages.length === 0 ? (
        <div className="size-full flex justify-center items-center dark:text-white">
          <div>
            <div className="w-fit mx-auto">
              <MessageSquareOff size={100} />
            </div>
            <h1 className="text-2xl italic ">No conversation Found </h1>
          </div>
        </div>
      ) : (
        <ChatMessages messages={messages} user={user} />
      )}
      <ChatInput
        message={message}
        setMessage={setMessage}
        handleSend={handleSend}
      />
    </div>
  );
}

export default ChatWindow;
