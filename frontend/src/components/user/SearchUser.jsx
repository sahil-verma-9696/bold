// src/components/SearchUser.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchUsers,
  setSearchQuery,
  clearSearch,
} from "../../features/user/userSlice";
import { Search } from "lucide-react";
import UserListItem from "../ui/UserListItem";
import SearchUserList from "../context/SearchUserList";

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

      <SearchUserList list={filteredUsers} />
    </div>
  );
};

export default SearchUser;
