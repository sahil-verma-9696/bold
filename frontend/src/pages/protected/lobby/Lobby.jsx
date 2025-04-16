import React from "react";
import Sidebar from "../components/Sidebar";

function Lobby() {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <section className="w-1/4 p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <Sidebar />
      </section>

      <section className="flex-1 p-4 bg-gray-100 dark:bg-gray-700">
        part2
      </section>

      <section className="flex-1 p-4 bg-gray-100 dark:bg-gray-700">
        part3
      </section>
    </div>
  );
}

export default Lobby;
