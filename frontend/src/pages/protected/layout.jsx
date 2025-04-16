import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Protected } from "../../features/auth/components/Protected";

function ProtectedLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Toaster />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Protected(ProtectedLayout);
