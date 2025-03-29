import { Link, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { PublicHeader } from "./../../components/ui/PublicHeader";
export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <PublicHeader />
      <Outlet />
    </div>
  );
}
