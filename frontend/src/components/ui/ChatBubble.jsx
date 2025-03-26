import React from "react";

const ChatBubble = ({ start, message }) => {
  function formatMongoTime(createdAt) {
    const date = new Date(createdAt);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }
  return (
    <div className={`chat chat-${start ? "start" : "end"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50">{formatMongoTime(message.createdAt)}</time>
      </div>
      <div className="chat-bubble">{message.text}</div>
    </div>
  );
};

export default ChatBubble;
