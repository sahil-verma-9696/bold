import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MessageCircle,
  Home,
  Users,
  Menu,
  X,
  User,
  Settings,
  Sun,
  Moon,
  LogOut,
  Bell,
} from "lucide-react";
import { useLogout } from "../../hooks/useLogout";

export function SidebarNav({ toggleChatList }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const { logoutHandler } = useLogout();
  const sidebarConfig = {
    navigation: [
      {
        name: "Chat",
        icon: MessageCircle,
        to: "/auth/chat",
        action: () => toggleChatList((prev) => !prev),
        isAvailable: true,
      },
      { name: "Notification", icon: Bell, to: "/", isAvailable: true },

      // { name: "Users", icon: Users, to: "/users", isAvailable: false }, // Disabled feature
    ],
    bottomActions: [
      {
        name: "Settings",
        icon: Settings,
        to: "/settings",
        isAvailable: false,
      },
      {
        name: "Profile",
        icon: User,
        to: "/auth/profile",
        isAvailable: true,
      },
    ],
    buttons: [
      {
        name: "Logout",
        icon: LogOut,
        isAvailable: true,
        action: logoutHandler,
      },
    ],
  };

  return (
    <aside
      className={`h-screen bg-gray-100 text-white dark:bg-gray-900 dark:text-gray-100 transition-all duration-300 flex flex-col ${
        isExpanded ? "w-56" : "w-16"
      }`}
    >
      {/* Toggle Sidebar */}
      <button
        className="p-3 flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Links */}
      <nav className="flex flex-col flex-grow gap-2 p-2">
        {sidebarConfig.navigation.map(
          ({ name, icon: Icon, to, isAvailable, action }) => (
            <div key={to} className="relative">
              {isAvailable ? (
                <Link
                  onClick={action || null}
                  to={to}
                  className={`flex items-center gap-4 p-2 rounded-lg transition-all ${
                    location.pathname === to
                      ? "bg-gray-300 dark:bg-gray-700"
                      : "hover:bg-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  {isExpanded && <span>{name}</span>}
                </Link>
              ) : (
                <div
                  className="flex items-center gap-4 p-2 rounded-lg opacity-50 cursor-not-allowed"
                  title="Coming soon"
                >
                  <Icon className="w-6 h-6" />
                  {isExpanded && <span>{name}</span>}
                </div>
              )}
            </div>
          )
        )}
      </nav>

      {/* Profile & Settings */}
      <div className="mt-auto flex flex-col gap-2 p-2">
        {sidebarConfig.buttons.map(
          ({ name, icon: Icon, isAvailable, action }) => (
            <button
              key={name}
              className={`flex items-center gap-4 p-2 rounded-lg transition-all ${
                isAvailable
                  ? "hover:bg-gray-300 dark:hover:bg-gray-800 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={action}
            >
              <Icon className="w-6 h-6" />
              {isExpanded && <span>{name}</span>}
            </button>
          )
        )}
        {sidebarConfig.bottomActions.map(
          ({ name, icon: Icon, to, isAvailable }) => (
            <div key={to} className="relative">
              {isAvailable ? (
                <Link
                  to={to}
                  title={name}
                  className={`flex items-center gap-4 p-2 rounded-lg transition-all ${
                    location.pathname === to
                      ? "bg-gray-300 dark:bg-gray-700"
                      : "hover:bg-gray-300 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  {isExpanded && <span>{name}</span>}
                </Link>
              ) : (
                <div
                  className="flex items-center gap-4 p-2 rounded-lg opacity-50 cursor-not-allowed"
                  title="Coming soon"
                >
                  <Icon className="w-6 h-6" />
                  {isExpanded && <span>{name}</span>}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </aside>
  );
}
