// src/components/SearchUser.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSearchResults,
  setSearchQuery,
  clearSearch,
} from "../../features/user/userSlice";
import { Search } from "lucide-react";
import SearchUserList from "./SearchUserList";
import SearchInput from "../ui/SearchInput";

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
      dispatch(loadSearchResults(queryParam));
    } else {
      dispatch(clearSearch());
    }
  }, [searchQuery, selectedFilter, dispatch]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="p-2 space-y-2">
      <SearchInput
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
      <SearchUserList list={filteredUsers} />
    </div>
  );
};

export default SearchUser;
