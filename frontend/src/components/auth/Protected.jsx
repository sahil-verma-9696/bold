import { Navigate } from "react-router-dom";

export default function Protected(Component) {
  
  return function ProtectedComponent(props) {
    const isAuthenticated = document.cookie.includes("authToken"); // Example check

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    return <Component {...props} />;
  };
}
