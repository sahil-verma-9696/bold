import { Link, Outlet } from "react-router-dom";
import PublicHeader from "../ui/PublicHeader";
import { Toaster } from "react-hot-toast";

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <PublicHeader />
      <Outlet />
    </div>
  );
}
