function ChatHeader({ receiver }) {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-lg font-semibold dark:text-white">
      Chat with <span className="capitalize">{receiver.name}</span>
    </div>
  );
}

export default ChatHeader;
