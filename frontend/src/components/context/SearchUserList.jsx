import React from "react";
import SearchUserListItem from "./SearchUserListItem";
import { Check, X } from "lucide-react";
import UserListItem from "../ui/UserListItem";
import { useSelector } from "react-redux";

const SearchUserList = ({ list }) => {
  if (list.length === 0) return null;
  const { pendings, requests, blocked } = useSelector((store) => store.user);
  const { _id } = useSelector((store) => store.auth.user);
  
  function handleType(id) {
    if (pendings?.some((user) => user._id === id)) {
      return "pending";
    }
    if (requests?.some((user) => user._id === id)) {
      return "request";
    }
    if (blocked?.some((user) => user._id === id)) {
      return "blocked";
    }
    if (id === _id) {
      return "me";
    }

    return "unknown";
  }

  return (
    <ul className="dark:bg-[#131416] max-h-[50vh] overflow-y-scroll">
      {list.map((user) => {
        return (
          <UserListItem
            key={user._id}
            type={handleType(user._id)}
            mode="search"
            user={user}
          />
        );
      })}
    </ul>
  );
};
export default SearchUserList;
