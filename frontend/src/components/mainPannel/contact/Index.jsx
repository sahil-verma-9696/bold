import { useSelector } from "react-redux";
import { Header } from "./Header";
import { currWindow } from "../../../redux/slices/contactSlice";

export function Index() {
  const activeHeader = useSelector((store) => store.contacts.activeHeader);
  const Windows = currWindow[activeHeader];

  return (
    <div className="flex flex-col h-full text-white p-4 overflow-y-auto">
      <Header />
      <div className="flex-1 mt-4">
        <Windows />
      </div>
    </div>
  );
}
