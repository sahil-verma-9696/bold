import { useDispatch, useSelector } from "react-redux";
import { toggleContext } from "../../redux/slices/sidebar";
import { setLeftPannel } from "../../redux/slices/leftPannel";
import { SidebarItem } from "./SidebarItem";
import { BookUser, Menu, MessageCircleMore, Users } from "lucide-react";
import { setWindow } from "../../redux/slices/mainSlice";

export function SidebarList1() {
  const dispatch = useDispatch();
  const { pannel } = useSelector((store) => store.leftPannel);

  const list = [
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
        dispatch(setLeftPannel("chats"));
        dispatch(setWindow("chat"));
      },
      isActive: pannel === "chats",
    },
    // {
    //   type: "button",
    //   icon: <Users />,
    //   label: "Group",
    //   onClick: () => {
    //     dispatch(setLeftPannel("group"));
    //   },
    //   isActive: pannel === "group",
    // },
    {
      type: "button",
      icon: <BookUser />,
      label: "Contacts",
      onClick: () => {
        dispatch(setLeftPannel("contact"));
        dispatch(setWindow("contact"));
      },
      isActive: pannel === "contact",
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
