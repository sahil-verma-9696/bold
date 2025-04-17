import { Users } from "lucide-react";

function EmptyChat() {
  return (
    <div className="flex flex-col h-full items-center justify-center text-center p-4">
      <Users className="w-16 h-16 text-gray-400 dark:text-gray-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300">
        No user selected
      </h2>
      <p className="text-gray-500 dark:text-gray-400">
        Please select a user from the sidebar to start chatting.
      </p>
    </div>
  );
}

export default EmptyChat;
