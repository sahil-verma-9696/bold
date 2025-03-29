import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "../../context/SocketContext";
import PrivateHeader from "../../components/ui/PrivateHeader";
import { Protected } from "../../components/auth/Protected";
import { Sidebar } from "../sidebar/Sidebar";

function ProtectedLayout() {
  return (
    <SocketProvider>
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-grow p-4">
          <Toaster />
          <PrivateHeader />
          <Outlet />
        </main>
      </div>
    </SocketProvider>
  );
}

const ProtectedLayoutWithAuth = Protected(ProtectedLayout);
export { ProtectedLayoutWithAuth };
