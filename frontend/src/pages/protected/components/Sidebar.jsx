import React, { useState } from "react";
import { Home, User } from "lucide-react";
import { useSelector } from "react-redux";
import Me from "../../../features/user/components/Me";

function Sidebar() {
  const { user } = useSelector((store) => store.auth);
  const [showMe, setShowMe] = useState(false);

  const sidebarTop = [
    {
      icon: <Home />,
      label: "Home",
      link: "/home",
    },
  ];

  const sidebarBottom = [
    {
      icon: <User />,
      label: "Profile",
      link: "/profile",
    },
  ];

  const handleToggleMe = () => {
    setShowMe((prev) => !prev);
  };

  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col p-4 shadow-lg rounded-lg">
      {/* Top Section */}
      <ul className="flex flex-col gap-4 mb-auto">
        {sidebarTop.map((item, index) => (
          <li key={index} className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md">
            <a href={item.link} className="flex items-center gap-2 text-lg">
              {item.icon}
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {/* Bottom Section */}
      <ul className="flex flex-col gap-4 mt-auto">
        {sidebarBottom.map((item, index) => (
          <li key={index} className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md">
            <a href={item.link} className="flex items-center gap-2 text-lg">
              {item.icon}
              <span>{item.label}</span>
            </a>
          </li>
        ))}
        <li className="flex items-center gap-2 cursor-pointer hover:bg-gray-700 p-2 rounded-md" onClick={handleToggleMe}>
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full border-2 border-white"
          />
        </li>
      </ul>

      {showMe && (
        <div className="mt-4 p-4 bg-gray-700 rounded-md">
          <Me />
        </div>
      )}
    </div>
  );
}

export default Sidebar;
