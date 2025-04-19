import React, { useState } from "react";
import { Home, LogOut, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Me from "../user/Me";
import { setSelectedChannel } from "../../pages/protected/lobby/lobbySlice";
import { disconnectSocket } from "../../redux/middlewares/socket";
import { logout } from "../../features/auth/authSlice";

function Sidebar() {
  const { user } = useSelector((store) => store.auth);
  const { selectedChannel } = useSelector((store) => store.lobby);
  const dispatch = useDispatch();
  const [showMe, setShowMe] = useState(false);

  const handleToggleMe = () => setShowMe((prev) => !prev);

  const list = [
    [
      {
        type: "button",
        icon: <Home />,
        label: "Home",
        onClick: () => {
          dispatch(setSelectedChannel("Home"));
        },
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
        icon: <Settings />,
        label: "Settings",
        onClick: () => {
          dispatch(setSelectedChannel("Setting"));
        },
      },
      {
        type: "button",
        icon: (
          <img
            src={user?.avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full border-2 border-white"
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
      <section className="hidden lg:flex flex-col justify-between bg-white dark:bg-gray-800 py-4 border-r border-gray-700 w-[5vw]">
        {list.map((item, index) => (
          <ul key={index} className="flex flex-col gap-6 px-2">
            {item.map((item) => (
              <li
                key={item.label}
                className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg cursor-pointer"
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
                    className="w-full flex flex-col items-center text-gray-800 dark:text-white"
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
      <section className="flex justify-between fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white dark:bg-gray-800 border-t border-gray-700 px-4 py-2">
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
