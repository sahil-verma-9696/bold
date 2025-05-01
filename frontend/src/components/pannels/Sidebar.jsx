import { Me } from "../ui/Profile";
import { useSelector } from "react-redux";
import { SidebarList1 } from "../sidebar/SidebarList1";
import { SidebarList2 } from "../sidebar/SidebarList2";

export default function Sidebar() {
  const showMe = useSelector((store) => store.sidebar.openMeProfile);
  return (
    <section className="hidden h-screen sm:flex sm:w-[65px] flex-col shrink-0 justify-between bg-white dark:bg-black py-4 border-r border-gray-700">
      <SidebarList1 />
      <SidebarList2 />
      {showMe && <Me />}
    </section>
  );
}
