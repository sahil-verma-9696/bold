import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Protected } from "../../components/auth/Protected";
import { Sidebar } from "../sidebar/Sidebar";
import { SocketProvider } from "../../context/SocketContext";

function ProtectedLayout() {
  return (
    <SocketProvider>
      <div className="min-h-screen flex">
        <Sidebar />
        <main className="flex-grow">
          <Toaster />
          <Outlet />
        </main>
      </div>
    </SocketProvider>
  );
}

const ProtectedLayoutWithAuth = Protected(ProtectedLayout);
export { ProtectedLayoutWithAuth };
