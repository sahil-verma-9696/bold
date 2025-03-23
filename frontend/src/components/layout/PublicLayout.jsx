import { Link, Outlet } from "react-router-dom";
import PublicHeader from "../ui/PublicHeader";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <Outlet />
    </div>
  );
}
