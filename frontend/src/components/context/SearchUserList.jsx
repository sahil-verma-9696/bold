import React from "react";
import SearchUserListItem from "./SearchUserListItem";

const SearchUserList = ({ list }) => {
  if (list.length === 0) return null;
  return (
    <ul className="dark:bg-[#131416] max-h-[50vh] overflow-y-scroll">
      {list.map((user) => {
        return <SearchUserListItem key={user._id} user={user} />;
      })}
    </ul>
  );
};

export default SearchUserList;
