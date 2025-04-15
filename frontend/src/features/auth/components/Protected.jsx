import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, me } from "../authSlice";
import { Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Protected(Component) {
  return function ProtectedComponent(props) {
    const dispatch = useDispatch();
    const { loading, user } = useSelector((store) => store.auth);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
      const userId = localStorage.getItem("userId");

      const checkUser = async () => {
        try {
          if (userId && !user) {
            await dispatch(me()).unwrap();
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

      checkUser();
    }, [dispatch]);

    // 🧠 Wait until auth is checked
    if (!checked || loading) return <p>Loading...</p>;

    if (!user) return <Navigate to="/auth" replace />;

    return <Component {...props} />;
  };
}
