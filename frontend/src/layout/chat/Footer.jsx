import { File, ImageIcon, Send, Smile } from "lucide-react";
import React, { useState } from "react";
import ChatInput from "../../components/ui/inputs/ChatInput";
import { apiRequest } from "../../utils/apiHelper";

function Footer({ sender }) {
  const selectedUserId = sender?._id;

  const [message, setMessage] = useState("");

  async function handleSendMessages() {
    console.log("hir");
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
    <footer className="flex items-center py-2 px-6">
      <div className="py-2 px-3 hover:bg-base-200 rounded-lg">
        <Smile />
      </div>
      <div className="py-2 px-3 hover:bg-base-200 rounded-lg">
        <ImageIcon />
      </div>
      <ChatInput
        value={message}
        onChange={(e) => setMessage(e.target.value)} // Ensure input updates
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            // Prevents shift + enter new lines
            e.preventDefault(); // Prevents new line in textarea
            handleSendMessages();
          }
        }}
      />
      <div className="py-2 px-3 hover:bg-base-200 rounded-lg cursor-pointer">
        <Send onClick={handleSendMessages} />
      </div>
    </footer>
  );
}

export default Footer;
