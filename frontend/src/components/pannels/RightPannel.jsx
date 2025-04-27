import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../ui/Avatar";
import { removeFriend } from "../../features/user/userSlice";
import { sendFriendRequest } from "../../features/user/userService";
import { setReceiver } from "../../features/chat/chatAreaSlice";

const UserActionButton = ({ type, onAddFriend, onRemoveFriend }) => {
  let buttonText = "";
  let buttonStyle = "";
  let disabled = false;
  let handleClick = null;

  switch (type) {
    case "pending":
      buttonText = "Pending...";
      buttonStyle = "bg-blue-400";
      disabled = true;
      break;
    case "request":
      buttonText = "Accept Request";
      buttonStyle = "bg-yellow-400";
      // handleClick = handleAcceptRequest; (optional future feature)
      break;
    case "blocked":
      buttonText = "Blocked";
      buttonStyle = "bg-gray-400";
      disabled = true;
      break;
    case "me":
      return null;
    case "unknown":
      buttonText = "Add Friend";
      buttonStyle = "bg-green-400";
      handleClick = onAddFriend;
      break;
    default:
      buttonText = "Remove Friend";
      buttonStyle = "bg-red-400";
      handleClick = onRemoveFriend;
      break;
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`w-full cursor-pointer ${buttonStyle} text-white px-4 py-1 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {buttonText}
    </button>
  );
};

const RightPannel = () => {
  const receiver = useSelector((store) => store.chat.receiver);
  const { friends, pendings, requests, blocked } = useSelector(
    (store) => store.user
  );
  const { _id } = useSelector((store) => store.auth.user);
  const onlineUsers = useSelector((store) => store.user.onlineUsers);
  const dispatch = useDispatch();

  function handleType(id) {
    if (friends?.some((user) => user._id === id)) {
      return "";
    }
    if (pendings?.some((user) => user._id === id)) {
      return "pending";
    }
    if (requests?.some((user) => user._id === id)) {
      return "request";
    }
    if (blocked?.some((user) => user._id === id)) {
      return "blocked";
    }
    if (id === _id) {
      return "me";
    }
    return "unknown";
  }

  function handleRemoveFriend() {
    dispatch(removeFriend(receiver._id));
    dispatch(setReceiver(null));
  }

  function handleAddFriend() {
    dispatch(sendFriendRequest(receiver._id));
  }

  if (!receiver) return null;

  const relationType = handleType(receiver._id);

  return (
    <section className="h-screen w-90 dark:bg-black max-lg:hidden">
      <header className="w-full h-50 bg-purple-400 relative">
        <Avatar
          size="md"
          img={receiver.avatar}
          css={"absolute top-full -translate-y-1/2 mx-12"}
          showOnline={onlineUsers.includes(receiver._id)}
        />
      </header>
      <div className="p-12">
        <h2 className="dark:text-white text-2xl">{receiver.name}</h2>
        <h2 className="dark:text-white text-lg">@{receiver.username}</h2>
        <h2 className="dark:text-white text-md">{receiver.email}</h2>
        <h2 className="dark:text-white text-sm italic">{receiver.bio}</h2>

        <div className="py-4">
          <UserActionButton
            type={relationType}
            onAddFriend={handleAddFriend}
            onRemoveFriend={handleRemoveFriend}
          />
        </div>
      </div>
    </section>
  );
};

export default RightPannel;
