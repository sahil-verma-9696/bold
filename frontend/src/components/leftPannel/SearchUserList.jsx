import React from "react";
import UserListItem from "../ui/UserListItem";
import { useDispatch, useSelector } from "react-redux";
import { getUserType } from "../../utils/getUserType";
import { setRightPannelUser } from "../../redux/slices/rightPannel";

const SearchUserList = ({ list }) => {
  const dispatch = useDispatch();
  if (list.length === 0) return null;
  return (
    <ul className="dark:bg-[#131416] max-h-[50vh] overflow-y-scroll">
      {list.map((user) => {
        return (
          <UserListItem
            onClick={() => dispatch(setRightPannelUser(user))}
            key={user?._id}
            type={getUserType(user?._id)}
            mode="search"
            user={user}
          />
        );
      })}
    </ul>
  );
};
export default SearchUserList;
