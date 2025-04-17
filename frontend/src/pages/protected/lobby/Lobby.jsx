import React from "react";
import Sidebar from "../components/Sidebar";
import Context from "../components/contextPannels/Context";

function Lobby() {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <Context />

      <section className="flex-1 p-4 bg-gray-100 dark:bg-gray-700">
        part3
      </section>
    </div>
  );
}

export default Lobby;
