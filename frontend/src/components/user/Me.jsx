import React from "react";
import { useSelector } from "react-redux";

function Me() {
  const { user } = useSelector((store) => store.auth);

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      

      {/* Floating Profile Card */}
      <div className="relative z-50 bg-white text-black rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm animate-fadeInUp">
        <div className="flex flex-col items-center gap-4">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          />
          <h2 className="text-2xl font-semibold capitalize">{user.name}</h2>
          <p className="text-sm text-gray-600">@{user.username}</p>
          <p className="text-sm text-gray-700">{user.email}</p>
          {user.bio && <p className="text-sm text-gray-500 text-center">{user.bio}</p>}

          <div className="mt-4 flex flex-wrap gap-3 justify-center text-xs text-gray-500">
            <span className="bg-gray-200 px-3 py-1 rounded-full font-medium">
              {user.role}
            </span>
            <span>Joined on {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Me;
