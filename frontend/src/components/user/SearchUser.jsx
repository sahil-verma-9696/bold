// src/components/SearchUser.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchUsers,
  setSearchQuery,
  clearSearch,
} from "../../features/user/userSlice";
import { Search } from "lucide-react";

const filters = ["all", "friends", "blocked", "requests", "pending"];

const SearchUser = () => {
  const dispatch = useDispatch();
  const { searchQuery, filteredUsers } = useSelector((state) => state.user);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    if (searchQuery.trim()) {
      const queryParam =
        `${searchQuery}` +
        (selectedFilter !== "all" ? `&filter=${selectedFilter}` : "");
      dispatch(searchUsers(queryParam));
    } else {
      dispatch(clearSearch());
    }
  }, [searchQuery, selectedFilter, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="p-2 space-y-2">
      <div className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-xl">
        <Search />
        <input
          className="flex-1 px-2 outline-none bg-transparent"
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {filters?.map((filter) => (
          <button
            key={filter}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              selectedFilter === filter
                ? "bg-blue-600 text-white"
                : "bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white"
            }`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <ul className="max-h-96 overflow-y-auto">
        {filteredUsers?.map((user) => (
          <li key={user._id} className="py-1 border-b dark:border-gray-600">
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUser;
