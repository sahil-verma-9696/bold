import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { setMobileMode } from "../../pages/protected/lobby/lobbySlice";
import { useMediaQuery } from "react-responsive";

function ChatHeader({ receiver }) {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ minWidth: 640 });

  return (
    <div className="flex items-center gap-2 p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-lg font-semibold dark:text-white">
      {!isDesktop && <span onClick={() => dispatch(setMobileMode("chats"))}>
        <ArrowLeft />
      </span>}
      Chat with <span className="capitalize">{receiver.name}</span>
    </div>
  );
}

export default ChatHeader;
