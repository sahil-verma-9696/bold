import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Dashboard from "./pages/protected/Dashboard";
import About from "./pages/public/About";
import ErrorPage from "./components/util/ErrorPage";
import Contact from "./pages/public/Contact";
import Signup from "./pages/public/Signup";
import Profile from "./pages/protected/Profile";
import { PublicLayout } from "./layout/public/layout";
import { ProtectedLayoutWithAuth } from "./layout/private/layout";

export const ROUTES = {
  PUBLIC: {
    ROOT: "/",
    LOGIN: "/login",
    //TODO
  },
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/auth",
    element: <ProtectedLayoutWithAuth />,
    errorElement: <ErrorPage />, // Show custom error UI
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
