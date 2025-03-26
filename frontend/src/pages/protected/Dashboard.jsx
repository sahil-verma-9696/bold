import React, { useEffect, useRef, useState } from "react";
import { MessageCircle } from "lucide-react"; // Importing chat icon
import { useSelector } from "react-redux";
import SidebarUserCard from "../../components/ui/SidebarUserCard";
import ChatBubble from "../../components/ui/ChatBubble";

function Dashboard() {
  const selectedUser = useSelector((store) => store.chat.selectedUser);
  const socket = useSelector(store=>store.auth.socket)
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  // console.log(selectedUser);
  const messagesEndRef = useRef(null);

  async function handleSendMessages() {
    if (!message.trim()) return; // Prevent sending empty messages

    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${selectedUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // required to send cookie to backend
          body: JSON.stringify({ text: message.trim() }),
        }
      );
      const data = await response.json();
      console.log(data);


      socket.on("newMessage", (newMessage) => {
        const isMessageSentFromSelectedUser =
          newMessage.senderId === selectedUser._id;
        if (!isMessageSentFromSelectedUser) return;

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      // Clear input field
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  async function handleGetMessages() {
    if (!selectedUser) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/messages/${selectedUser._id}`,
        {
          credentials: "include", // required to send cookie to backend
        }
      );
      const data = await response.json();
      console.log(data);
      setMessages(data.payload);
    } catch (error) {}
  }
  useEffect(() => {
    handleGetMessages();
  }, [selectedUser]); // Fetch messages only when selectedUser changes

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (selectedUser === null) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-85px)] text-white">
        <MessageCircle className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-300">
          Please <span className="text-white">select a user</span> to chat.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-85px)] ">
      <div className="bg-base-100 p-4 shadow-sm">
        <SidebarUserCard user={selectedUser} />
      </div>

      {/* Chat Messages Area (Placeholder for now) */}
      <div className="flex-1 p-4 overflow-y-auto  text-white">
        {false && (
          <p className="text-gray-400">Chat messages will appear here...</p>
        )}

        {messages.map((message) => (
          <ChatBubble
            key={message._id}
            start={!(message.receiverId === selectedUser._id)}
            message={message}
          />
        ))}
        {/* Auto-scroll reference */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input Field & Send Button */}
      <div className=" p-4 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg border text-white outline-none"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendMessages}
          className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
