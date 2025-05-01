import { Check, Plus, TimerIcon, User, X } from "lucide-react";
import {
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
} from "../../features/user/userService";
import { useCallback } from "react";

export function UserActions({ type, user }) {
  const handleFriendRequest = useCallback(
    async (e) => {
      e.stopPropagation();
      sendFriendRequest(user._id);
    },
    [user._id]
  );

  const handleAccept = useCallback(
    async (e) => {
      e.stopPropagation();
      acceptFriendRequest(user._id);
    },
    [user._id]
  );

  const handleReject = useCallback(
    async (e) => {
      e.stopPropagation();
      rejectFriendRequest(user._id);
    },
    [user._id]
  );
  switch (true) {
    case type === "pending":
      return <TimerIcon />;
      break;

    case type === "unknown":
      return <Plus onClick={handleFriendRequest} />;
      break;
    case type === "request":
      return (
        <span className="flex gap-4">
          <Check onClick={handleAccept} />
          <X onClick={handleReject} />
        </span>
      );
      break;
    case type === "me":
      return <User />;
      break;

    default:
      return null;
  }
}
