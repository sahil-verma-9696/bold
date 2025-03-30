import { useState } from "react";
import { ChatList } from "./ChatList";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  const [showChatlist, toggleChatList] = useState(true);
  return (
    <div className="flex h-screen bg-base-200">
      <SidebarNav
        toggleChatList={toggleChatList}
        className="w-16 flex-shrink-0"
      />
      {showChatlist && <ChatList className="flex-1 " />}
    </div>
  );
}
