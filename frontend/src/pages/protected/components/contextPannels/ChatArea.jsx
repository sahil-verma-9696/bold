import React, { useState } from "react";

function ChatArea() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() !== "") {
      // send message logic here
      console.log("Send:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:text-white dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-lg font-semibold">
        Chat Room
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {/* Example messages */}
        <div className="text-left">
          <div className="inline-block bg-blue-100 dark:bg-blue-800 text-black dark:text-white px-4 py-2 rounded-lg">
            Hey there!
          </div>
        </div>
        <div className="text-right">
          <div className="inline-block bg-green-100 dark:bg-green-800 text-black dark:text-white px-4 py-2 rounded-lg">
            Hello! 👋
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:outline-none"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatArea;
