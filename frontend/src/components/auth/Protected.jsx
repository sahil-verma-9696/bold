import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { clearUser, me } from "../../features/auth/authSlice";
import { store } from "../../redux/store";
import { createSocketMiddleware } from "../../redux/middlewares/socket";

export const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [checked, setChecked] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    const verify = async () => {
      try {
        if (userId && !user) {
          const response = await dispatch(me()).unwrap();

          // Setup socket middleware if needed
          const socketMiddleware = createSocketMiddleware(
            import.meta.env.VITE_BACKEND_BASE_URL,
            store,
            response.user._id
          );
          store.dispatch = socketMiddleware(store)(store.dispatch);
        } else if (!userId) {
          dispatch(clearUser());
        }
      } catch (err) {
        dispatch(clearUser());
      } finally {
        setChecked(true);
      }
    };

    verify();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      navigate("/");
    }
  }, [error, navigate]);

  if (!checked || loading)
    return (
      <div className="flex items-center size-screen p-4 gap-2 dark:bg-black">
        <section className="w-1/5 h-screen animate-pulse shadow rounded-xl dark:bg-[#131416]"></section>
        <section className=" animate-pulse w-[40%] h-screen shadow rounded-xl dark:bg-[#131416]"></section>
        <section className="animate-pulse flex-1 h-screen shadow rounded-xl dark:bg-[#131416]"></section>
      </div>
    );

  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;

  return children;
};
