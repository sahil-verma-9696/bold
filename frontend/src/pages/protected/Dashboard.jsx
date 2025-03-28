import { MessageCircle } from "lucide-react"; // Importing chat icon
import { useSelector } from "react-redux";
import SidebarUserCard from "../../components/ui/SidebarUserCard";
import ChatInputHandler from "../../components/ui/ChatInputHandler";
import ChatArea from "../../components/ui/ChatArea";

function Dashboard() {
  const selectedUser = useSelector((store) => store.chat.selectedUser);

  if (selectedUser === null) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-85px)] text-white">
        <MessageCircle className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-300">
          Please <span className="text-white">select a user</span> to chat.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-85px)] ">
      <SidebarUserCard user={selectedUser} />
      <ChatArea selectedUser={selectedUser} />
      <ChatInputHandler selectedUser={selectedUser} />
    </div>
  );
}

export default Dashboard;
