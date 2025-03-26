import { Outlet } from "react-router-dom";
import Protected from "../auth/Protected";
import PrivateHeader from "../ui/PrivateHeader";
import { Toaster } from "react-hot-toast";
import Sidebar from "../ui/Sidebar";

function ProtectedLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-grow p-4">
        <Toaster />
        <PrivateHeader />
        <Outlet />
      </main>
    </div>
  );
}

export default Protected(ProtectedLayout);
