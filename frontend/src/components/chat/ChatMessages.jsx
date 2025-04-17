import { useRef, useEffect } from "react";

function ChatMessages({ messages, user }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto space-y-3">
      {messages.map((msg, index) => {
        const isMe = msg.senderId === user._id;
        return (
          <div
            key={index}
            className={`w-full flex ${isMe ? "justify-end" : "justify-start"} flex-col`}
          >
            <div
              className={`max-w-xs sm:max-w-sm md:max-w-md break-words px-4 py-2 rounded-lg ${
                isMe
                  ? "bg-green-100 dark:bg-green-800 text-black dark:text-white self-end"
                  : "bg-blue-100 dark:bg-blue-800 text-black dark:text-white self-start"
              }`}
            >
              {msg.text}
            </div>
            <span
              className={`text-xs text-gray-500 mt-1 ${
                isMe ? "text-right pr-2" : "text-left pl-2"
              }`}
            >
              {new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatMessages;
