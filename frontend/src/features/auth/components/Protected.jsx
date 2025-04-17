// components/ProtectedRoute.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

import { clearUser, me } from "../authSlice";
import { store } from "../../../redux/store";
import { createSocketMiddleware } from "../../../redux/middlewares/socket";

export const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const verify = async () => {
      try {
        if (userId && !user) {
          const response = await dispatch(me()).unwrap();

          // Setup socket middleware if needed
          const socketMiddleware = createSocketMiddleware(
            "http://localhost:5000", // or your deployed backend
            store,
            response.user._id
          );
          store.dispatch = socketMiddleware(store)(store.dispatch);
        } else if (!userId) {
          dispatch(clearUser());
        }
      } catch (err) {
        toast.error(err.message || "Authentication failed");
        dispatch(clearUser());
      } finally {
        setChecked(true);
      }
    };

    verify();
  }, [dispatch]);

  if (!checked || loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;

  return children;
};
