import { useState } from "react";
import { apiRequest } from "../../utils/apiHelper";
import ChatInput from "./ChatInput";

export default function ChatInputHandler({ selectedUserId }) {
  const [message, setMessage] = useState("");
  async function handleSendMessages() {
    if (!message.trim()) return;
    try {
      await apiRequest(`/api/messages/${selectedUserId}`, "POST", {
        text: message.trim(),
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Sending msg failed. Please try again."
      );
    }
  }
  return (
    <div>
      <ChatInput value={message} onChange={(e) => setMessage(e.target.value)} />
      <button
        onClick={handleSendMessages}
        className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
      >
        Send
      </button>
    </div>
  );
}
