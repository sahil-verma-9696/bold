import { useEffect } from "react";
import { setAllUsers } from "../redux/slices/chatSlice";
import { useDispatch } from "react-redux";
import { apiRequest } from "../utils/apiHelper";

export function useAllUsers() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchUsers() {
      const data = await apiRequest("/api/messages/users", "GET");
      dispatch(setAllUsers(data?.payload || []));
    }
    fetchUsers();
  }, []);
}
