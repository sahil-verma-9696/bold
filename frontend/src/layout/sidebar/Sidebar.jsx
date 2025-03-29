import { ChatList } from "./ChatList";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  return (
    <div className="flex h-screen bg-base-200">
      <SidebarNav className="w-16 flex-shrink-0" />
      <ChatList className="flex-1" />
    </div>
  );
}
