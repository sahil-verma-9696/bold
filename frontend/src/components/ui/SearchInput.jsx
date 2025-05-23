import { Search } from "lucide-react";
import React from "react";

const SearchInput = ({ searchQuery, handleSearchChange }) => {
  return (
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
  );
};

export default SearchInput;
