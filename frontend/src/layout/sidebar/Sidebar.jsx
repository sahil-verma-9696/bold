import { ChatList } from "./ChatList";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {
  return (
    <div className="grid grid-cols-2 bg-base-200">
      <SidebarNav />
      <ChatList />
    </div>
  );
}
