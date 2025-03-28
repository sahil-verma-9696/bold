import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Protected } from "../../components/auth/Protected";
import { Sidebar } from "../sidebar/Sidebar";

function ProtectedLayout() {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-grow p-4">
        <Toaster />
        <Outlet />
      </main>
    </div>
  );
}

const ProtectedLayoutWithAuth = Protected(ProtectedLayout);
export { ProtectedLayoutWithAuth };
