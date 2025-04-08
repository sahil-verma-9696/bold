import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // ✅ Import react-hot-toast
import { apiRequest } from "../../utils/apiHelper";
import { useSocket } from "../../context/SocketContext";

export function Protected(Component) {
  return function ProtectedComponent(props) {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(null); // ✅ Tracks authentication status

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const userId = localStorage.getItem("userId"); // Get userId
          if (!userId) throw new Error("No userId found.");
          
          const data = await apiRequest("/api/auth/me", "GET");
          if (data.type === "error") throw new Error(data.message);
          if (data.type === "success") {
            dispatch(setUser(data.payload.user));
            setIsAuthenticated(true); // ✅ Mark as authenticated
          } else {
            dispatch(clearUser());
            setIsAuthenticated(false); // ❌ Not authenticated
          }
        } catch (error) {
          console.log(error);
          dispatch(clearUser());
          setIsAuthenticated(false); // ❌ Not authenticated
          toast.error(error.message || "Authentication failed!"); // ✅ Show toast notification
        }
      };

      checkAuth();
    }, [dispatch]);

    // ✅ Initialize socket *only after authentication is confirmed*
    const socket = useSocket();
    useEffect(() => {
      if (isAuthenticated) {
        console.log("🔌 Initializing socket after authentication...");
        socket?.connect(); // Ensure socket connection
      }
    }, [isAuthenticated, socket]);

    if (isAuthenticated === null) return <p>Loading...</p>; // ✅ Prevent flickering

    if (!isAuthenticated) return <Navigate to="/login" replace />; // ✅ Redirect to login

    return <Component {...props} />;
  };
}
