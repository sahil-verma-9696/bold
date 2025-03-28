export default function ChatInput({ ...props }) {
  return(
    <input
      {...props}
      type="text"
      className="flex-1 px-4 py-2 rounded-lg border text-white outline-none"
      placeholder="Type a message..."
    />
  );
}
