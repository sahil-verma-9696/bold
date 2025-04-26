import { ArrowLeft } from "lucide-react";
import { useDispatch } from "react-redux";
import { setMobileMode } from "../../pages/protected/lobby/lobbySlice";
import { useMediaQuery } from "react-responsive";
import UserListItem from "../ui/UserListItem";

function ChatHeader({ receiver }) {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({ minWidth: 640 });

  return (
    <div className="flex items-center gap-2  bg-gray-100 dark:bg-[#131416] text-lg font-semibold dark:text-white">
      {!isDesktop && (
        <span onClick={() => dispatch(setMobileMode("chats"))}>
          <ArrowLeft />
        </span>
      )}
      <UserListItem user={receiver} />
    </div>
  );
}

export default ChatHeader;
