import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { apiRequest } from "../utils/apiHelper";
import { clearSocket } from "../redux/slices/authSlice";

export function useLogout() {
  const navigate = useNavigate(); // ✅ Call hooks at the top level
  const dispatch = useDispatch();
  const { user, socket } = useSelector((store) => store.auth); // ✅ Call hooks at the top level

  async function logoutHandler() {
    try {
      const loadingToast = toast.loading("Logging out...");
      const data = await apiRequest("/api/auth/logout", "GET");
      toast.dismiss(loadingToast);

      if (data.type === "error") {
        throw new Error(data.message || "Logout failed. Please try again.");
      }

      toast.success(data.message || "Logged out successfully!");

      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
      }

      dispatch(clearSocket());
      localStorage.removeItem("userId"); // Remove userId
      navigate("/"); // Redirect after logout
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.message || "Something went wrong!");
    }
  }

  return { logoutHandler };
}
