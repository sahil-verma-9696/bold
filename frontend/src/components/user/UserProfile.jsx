import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideProfile } from "../../features/user/userProfileSlice";
import { X } from "lucide-react";
import { removeFriend } from "../../features/user/userService";
import Avatar from "../ui/Avatar";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userProfile.userProfile);

  if (!user) return null;

  const currUser = useSelector((state) => state.auth.user);
  async function handleRemoverFriend() {
    removeFriend(user._id);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      {/* Background Overlay */}
      <div
        className="absolute inset-0 bg-transparent "
        onClick={() => dispatch(hideProfile())}
      />

      {/* Floating Profile Card */}
      <div className="relative z-50 bg-white dark:bg-[#131416] dark:text-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm animate-fadeInUp">
        {/* Close Button */}
        <button
          onClick={() => dispatch(hideProfile())}
          className="absolute top-3 right-3 p-1 text-gray-500 hover:text-gray-800 transition"
        >
          <X />
        </button>

        {/* User Info */}
        <div className="flex flex-col items-center gap-4">
          <Avatar size="md" img={user.avatar} />
          <h2 className="text-2xl font-semibold capitalize">{user.name}</h2>
          <p className="text-sm text-gray-600">{user.email}</p>
          <p className="text-xs text-gray-500 mt-1">
            Last seen: {new Date(user?.lastSeen).toLocaleString()}
          </p>

          {/* Red "Remove Friend" Button */}
          {currUser.friends?.includes(user._id) && (
            <button
              className="mt-4 px-4 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition"
              onClick={handleRemoverFriend}
            >
              Remove Friend
            </button>
          )}

          
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
