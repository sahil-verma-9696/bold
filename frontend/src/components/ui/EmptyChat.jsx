import { MessageSquare } from "lucide-react";

export function EmptyChat() {
  return (
    <div className="h-full flex flex-col items-center justify-center bg-transparent text-white">
      <MessageSquare className="w-16 h-16 text-gray-400" />
      <p className="text-gray-400 mt-4 text-lg">Start a conversation...</p>
    </div>
  );
}
