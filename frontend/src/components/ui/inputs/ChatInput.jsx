export default function ChatInput({ ...props }) {
  return (
    <textarea
      {...props}
      className="outline-0 h-full flex-1 hover:bg-base-200 py-2 px-4 rounded-2xl"
      type="text"
      placeholder="Type a message... (Press Enter to send, Shift + Enter for new line)"
    />
  );
}
