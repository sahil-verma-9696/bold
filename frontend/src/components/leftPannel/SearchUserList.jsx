import React from "react";
import UserListItem from "../ui/UserListItem";
import { useSelector } from "react-redux";
import { getUserType } from "../../utils/getUserType";

const SearchUserList = ({ list }) => {
  if (list.length === 0) return null;
  const { friends, pendings, requests, blocked } = useSelector(
    (store) => store.user
  );
  const { _id } = useSelector((store) => store.auth.user);

  return (
    <ul className="dark:bg-[#131416] max-h-[50vh] overflow-y-scroll">
      {list.map((user) => {
        return (
          <UserListItem
            key={user._id}
            type={getUserType(user._id)}
            mode="search"
            user={user}
          />
        );
      })}
    </ul>
  );
};
export default SearchUserList;
