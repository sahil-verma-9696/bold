import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser, clearUser } from "../../redux/slices/authSlice";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // ✅ Import react-hot-toast

export default function Protected(Component) {
  return function ProtectedComponent(props) {
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(null); // ✅ Tracks authentication status

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await fetch("http://localhost:5000/api/auth/check", {
            method: "GET",
            credentials: "include", // Include cookies
          });

          const data = await response.json();
          if (data.type === "error") throw new Error(data.message);

          if (response.ok && data.type === "success") {
            dispatch(setUser(data.payload.user));
            setIsAuthenticated(true); // ✅ Mark as authenticated
          } else {
            dispatch(clearUser());
            setIsAuthenticated(false); // ❌ Not authenticated
          }
        } catch (error) {
          dispatch(clearUser());
          setIsAuthenticated(false); // ❌ Not authenticated
          toast.error(error.message || "Authentication failed!"); // ✅ Show toast notification
        }
      };

      checkAuth();
    }, [dispatch]);

    if (isAuthenticated === null) return <p>Loading...</p>; // ✅ Prevent flickering

    if (!isAuthenticated) return <Navigate to="/login" replace />; // ✅ Redirect to login

    return <Component {...props} />;
  };
}
