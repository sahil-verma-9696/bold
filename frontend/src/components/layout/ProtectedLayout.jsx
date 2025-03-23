import { Outlet } from "react-router-dom";
import Protected from "../auth/Protected";

function ProtectedLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 p-4 bg-gray-800 text-white">Sidebar</aside>
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Protected(ProtectedLayout);
