import React, { useState } from "react";
import { Home, Settings } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Me from "../../../features/user/components/Me";
import { setSelectedChannel } from "../lobby/lobbySlice";

function Sidebar() {
  const { user } = useSelector((store) => store.auth);
  const { selectedChannel } = useSelector((store) => store.lobby);
  const dispatch = useDispatch();
  const [showMe, setShowMe] = useState(false);

  const handleToggleMe = () => {
    setShowMe((prev) => !prev);
  };

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
    <section className="flex flex-col justify-between w-20 bg-white dark:bg-gray-800 py-4 border-r">
      {list.map((item) => {
        return (
          <ul className="flex flex-col gap-6">
            {item.map((item, index) => (
              <li
                key={index}
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
                    className="w-full flex flex-col items-center text-gray-800 dark:text-white cursor-pointer"
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        );
      })}
      {showMe && <Me />}
    </section>
  );
}

export default Sidebar;
