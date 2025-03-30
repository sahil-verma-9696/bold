import { Check, CheckCheck } from "lucide-react";
import React from "react";

const ChatBubble = ({ right, message, senderAvatar, myAvatar }) => {
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
            src={senderAvatar || ""}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Chat Bubble */}
      <div
        className={`relative max-w-[75%] px-4 py-2 ${
          !right ? "rounded-tl-xl rounded-br-xl" : "rounded-bl-xl rounded-tr-xl"
        } shadow-md ${
          right
            ? "bg-blue-600 text-white self-end"
            : "bg-gray-800 text-gray-200"
        }`}
      >
        <p className="break-words">{message?.text || "invalid msg"}</p>
        <p className="text-xs opacity-70  mt-1 flex gap-2 justify-between items-center">
          <span>{<Check size={16} />}</span>
          <time className="text-right block">
            {formatMongoTime(message?.createdAt) || "invalid time"}
          </time>
        </p>
      </div>

      {/* User Avatar (Right Side) */}
      {right && (
        <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-500">
          <img
            alt="User Avatar"
            src={myAvatar || null}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(ChatBubble);
