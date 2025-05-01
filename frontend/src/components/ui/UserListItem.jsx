import Avatar from "./Avatar";
import { useSelector } from "react-redux";
import { UserActions } from "./UserActions";
import { lastSeenFormate } from "../../utils/lastSeenFormate";

const UserListItem = ({ user, mode = "normal", type, css, ...props }) => {
  const onlineUsers = useSelector((state) => state.user.onlineUsers);
  if (!user) return null;
  return (
    <li
      {...props}
      className={`flex justify-between items-center  px-2 py-2 cursor-pointer  dark:text-white ${css}`}
    >
      <div className="flex gap-2 items-center">
        <Avatar
          img={user.avatar}
          size="sm"
          showOnline={onlineUsers.includes(user._id)}
        />
        <UserMeta user={user} />
      </div>
      <UserActions type={type} user={user} />
    </li>
  );
};

function UserMeta({ user }) {
  if (!user) return null;
  return (
    <div className="flex flex-col">
      <span className="text-lg">{user.name}</span>
      {!(mode === "search") ? (
        <span className="text-sm text-gray-400 font-thin">
          {onlineUsers.includes(user._id)
            ? user.email
            : lastSeenFormate(user?.lastSeen)}
        </span>
      ) : (
        <span className="text-sm text-gray-400 font-thin">{user.email}</span>
      )}
    </div>
  );
}
export default UserListItem;
