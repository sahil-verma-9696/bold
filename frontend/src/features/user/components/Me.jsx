import React from "react";
import { useSelector } from "react-redux";

function Me() {
  const { user } = useSelector((store) => store.auth);

  if (!user) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-gray-800 text-white rounded-lg shadow-lg z-50">
      <div className="flex flex-col items-center p-6 bg-gray-700 rounded-lg shadow-md">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-gray-500 mb-4"
        />
        <h2 className="text-2xl font-semibold">{user.name}</h2>
        <p className="text-lg text-gray-400">@{user.username}</p>
        <p className="text-md text-gray-300">{user.email}</p>
        <p className="text-sm text-gray-200">{user.bio}</p>

        <div className="mt-4 flex gap-4 text-sm text-gray-400">
          <span className="bg-gray-600 px-3 py-1 rounded-full">
            {user.role}
          </span>
          <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}

export default Me;
