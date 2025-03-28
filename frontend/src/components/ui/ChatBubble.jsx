import React from "react";

const ChatBubble = ({ right, message }) => {
  function formatMongoTime(createdAt) {
    const date = new Date(createdAt);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <div
      className={`flex items-end gap-2 my-4 ${
        right ? "justify-end" : "justify-start"
      }`}
    >
      {/* User Avatar */}
      {!right && (
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-500">
          <img
            alt="User Avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Chat Bubble */}
      <div
        className={`relative max-w-[75%] px-4 py-2 rounded-lg shadow-md ${
          right
            ? "bg-blue-600 text-white self-end"
            : "bg-gray-800 text-gray-200"
        }`}
      >
        <p className="break-words">{message.text}</p>
        <p className="text-xs opacity-70 text-right mt-1">
          {formatMongoTime(message?.createdAt)}
        </p>
      </div>

      {/* User Avatar (Right Side) */}
      {right && (
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-500">
          <img
            alt="User Avatar"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(ChatBubble);
