import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-800 ">
      <Header />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
