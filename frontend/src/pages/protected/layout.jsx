import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function ProtectedLayout() {
  return (
    <div>
      <Toaster />
      <main className="h-screen w-screen overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
