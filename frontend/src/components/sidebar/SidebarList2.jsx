import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { LogOut } from "lucide-react";
import { disconnectSocket } from "../../redux/middlewares/socket";
import { toggleMeProfile } from "../../redux/slices/sidebar";
import { SidebarItem } from "./SidebarItem";

export function SidebarList2() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleToggleMe = () => dispatch(toggleMeProfile());

  const list = [
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
  ];
  
  return (
    <ul className="flex flex-col shrink-0 gap-6 px-2">
      {list?.map((item) => (
        <SidebarItem key={item.label} item={item} />
      ))}
    </ul>
  );
}
