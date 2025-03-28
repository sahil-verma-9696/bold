import React, { useEffect, useState } from "react";
import SidebarUserCard from "./SidebarUserCard";
import { useDispatch } from "react-redux";
import { apiRequest } from "../../utils/apiHelper";

function Sidebar() {
  const [users, setUsers] = useState([]);

  useEffect(function () {
    async function fetchUsers() {
      const data = await apiRequest("/api/messages/users", "GET");
      setUsers(data?.payload);
    }

    fetchUsers();
  }, []);
  return (
    <aside className="w-60 shrink-0 block h-screen overflow-y-scroll overflow-x-hidden  bg-gray-800 text-white sticky top-0">
      <h1 className="text-2xl font-bold bg-base-100 py-2 px-2 rounded-lg sticky top-0 z-10">
        Bold
      </h1>

      <ul className="py-4">
        {users.map((user) => (
          <SidebarUserCard key={user._id} user={user} />
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
