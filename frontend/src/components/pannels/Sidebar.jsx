import React, { useState } from "react";
import {
  BookUser,
  Home,
  LogOut,
  Menu,
  MessageCircleMore,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Me } from "../ui/Profile";
import { setSelectedChannel } from "../../pages/protected/lobby/lobbySlice";
import { disconnectSocket } from "../../redux/middlewares/socket";
import { logout } from "../../features/auth/authSlice";
import { toggleContext, toggleMeProfile } from "../../redux/slice/sidebar";
import { setWindow } from "../main/mainSlice";

function Sidebar() {
  const { user } = useSelector((store) => store.auth);
  const { selectedChannel } = useSelector((store) => store.lobby);
  const dispatch = useDispatch();
  const showMe = useSelector((store) => store.sidebar.openMeProfile);
  const window = useSelector((store) => store.mainPannel.window);
  const handleToggleMe = () => dispatch(toggleMeProfile());

  const list = [
    [
      {
        type: "button",
        icon: <Menu />,
        label: "",
        onClick: () => {
          dispatch(toggleContext());
        },
      },
      {
        type: "button",
        icon: <MessageCircleMore />,
        label: "Chats",
        onClick: () => {
          dispatch(setSelectedChannel("Home"));
          dispatch(setWindow("chat"));
        },
        isActive: selectedChannel === "Home",
      },
      {
        type: "button",
        icon: <Users />,
        label: "Group",
        onClick: () => {
          dispatch(setSelectedChannel("Group"));
        },
        isActive: selectedChannel === "Group",
      },
      {
        type: "button",
        icon: <BookUser />,
        label: "Contacts",
        onClick: () => {
          dispatch(setSelectedChannel("contact"));
          dispatch(setWindow("contact"));
        },
        isActive: selectedChannel === "contact",
      },
    ],
    [
      {
        type: "button",
        icon: <LogOut />,
        label: "Logout",
        onClick: () => {
          disconnectSocket();
          dispatch(logout());
        },
      },
      {
        type: "button",
        icon: (
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="w-[32px] aspect-square shrink-0 rounded-full border-2 border-white"
          />
        ),
        label: "Me",
        onClick: handleToggleMe,
      },
    ],
  ];

  return (
    <>
      {/* Desktop sidebar */}
      <section className="hidden h-screen sm:flex sm:w-[65px] flex-col shrink-0 justify-between bg-white dark:bg-black py-4 border-r border-gray-700">
        {list.map((item, index) => (
          <ul key={index} className="flex flex-col shrink-0 gap-6 px-2">
            {item.map((item) => (
              <li
                key={item.label}
                className={`hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer ${
                  item.isActive ? "bg-gray-800" : ""
                }`}
              >
                {item.type === "link" ? (
                  <Link
                    to={item.link}
                    className="flex flex-col items-center text-gray-800 dark:text-white"
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className={`w-full mx-auto shrink-0 flex flex-col items-center text-gray-800 dark:text-white cursor-pointer`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        ))}
        {showMe && <Me />}
      </section>

      {/* Mobile bottom navbar */}
      <section className="flex justify-between w-screen sm:hidden bg-white dark:bg-gray-800 px-4 py-2">
        <div className="flex justify-around items-center w-full">
          {[...list[0], ...list[1]].map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="flex flex-col items-center text-gray-800 dark:text-white"
            >
              {item.icon}
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
        {showMe && <Me />}
      </section>
    </>
  );
}

export default Sidebar;
