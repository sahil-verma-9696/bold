import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMeProfile } from "../../redux/slices/sidebar";
import { ButtonEditProfile } from "../ui/Button";
import Avatar from "../ui/Avatar";

export function Me() {
  const { user } = useSelector((store) => store.auth);
  const showProfile = useSelector((store) => store.sidebar.openMeProfile);
  const onlineUsers = useSelector((store) => store.user.onlineUsers);
  const dispatch = useDispatch();

  if (!user || !showProfile) return null;

  const handleBackdropClick = () => {
    dispatch(toggleMeProfile());
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  const handleEditProfile = () => {
    alert("Edit profile clicked!");
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-40 flex items-center justify-center bg-transparent bg-opacity-40"
    >
      <div
        onClick={handleCardClick}
        className="absolute bg-white dark:bg-[#131416] dark:text-white overflow-hidden rounded-lg bottom-17 left-17 w-70 "
      >
        <div className="relative bg-purple-400 w-full h-30">
          <Avatar
            size="md"
            img={user.avatar}
            css={"absolute top-full -translate-y-1/2 mx-10"}
            showOnline={onlineUsers.includes(user._id)}
          />
        </div>

        <div className="p-10">
          <h2 className=" text-xl font-semibold">{user.name}</h2>
          <p className=" text-sm">@{user.username}</p>
          <p className=" text-sm">{user.email}</p>
          {user.bio && (
            <p className=" italic text-sm text-gray-600">{user.bio}</p>
          )}
          <p className="py-2 text-gray-500 mb-4">
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <ButtonEditProfile onClick={handleEditProfile} />
        </div>
      </div>
    </div>
  );
}

export function User() {
  const { user } = useSelector((store) => store.auth);
  const showProfile = useSelector((store) => store.sidebar.openMeProfile);
  const dispatch = useDispatch();

  if (!user || !showProfile) return null;

  const handleBackdropClick = () => {
    dispatch(toggleMeProfile());
  };

  const handleCardClick = (e) => {
    e.stopPropagation();
  };

  const handleEditProfile = () => {
    alert("Edit profile clicked!");
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-40 flex items-center justify-center bg-transparent bg-opacity-40"
    >
      <div
        onClick={handleCardClick}
        className="absolute bg-white dark:bg-[#131416] dark:text-white overflow-hidden rounded-lg bottom-17 left-17 w-70 "
      >
        <div className="relative bg-purple-400 w-full h-30">
          <Avatar
            size="md"
            img={user.avatar}
            css={"absolute bottom-0 left-0 translate-y-1/2 mx-10"}
          />
        </div>

        <h2 className="mx-10 text-xl font-semibold mt-14">{user.name}</h2>
        <p className="mx-10 text-sm">@{user.username}</p>
        <p className="mx-10 text-sm">{user.email}</p>
        {user.bio && (
          <p className="mx-10 italic text-sm text-gray-600">{user.bio}</p>
        )}
        <p className="mx-10 py-2 text-gray-500 mb-4">
          Joined on {new Date(user.createdAt).toLocaleDateString()}
        </p>
        <ButtonEditProfile onClick={handleEditProfile} />
      </div>
    </div>
  );
}
