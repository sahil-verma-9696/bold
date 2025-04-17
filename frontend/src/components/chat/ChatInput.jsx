function ChatInput({ message, setMessage, handleSend }) {
  return (
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
  );
}

export default ChatInput;
