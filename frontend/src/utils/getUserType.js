import { useSelector } from "react-redux";

export function getUserType(id) {
  // const user = useSelector(store=>)
  const { friends, pendings, requests, blocked } = useSelector(
    (store) => store.user
  );
  if (friends?.some((user) => user._id === id)) {
    return "";
  }
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
