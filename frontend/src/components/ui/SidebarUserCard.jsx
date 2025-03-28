import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../redux/slices/chatSlice";

function SidebarUserCard({ user }) {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.chat);

  return (
    <div className="bg-base-100 p-4 shadow-sm">
      <li
        onClick={() => dispatch(setSelectedUser(user))}
        className={`w-full flex gap-4 items-center  p-2 rounded-md hover:bg-base-100 cursor-pointer ${
          user?._id === selectedUser?._id ? "bg-base-100" : ""
        }`}
      >
        <div className={`avatar avatar-${"offline"}`}>
          <div className="w-12 rounded-full">
            <img src={user?.avatar} />
          </div>
        </div>
        <div>
          <p className="text-lg">{user.name}</p>
          <p className="text-sm opacity-50">{user.email}</p>
        </div>
      </li>
    </div>
  );
}

export default SidebarUserCard;
