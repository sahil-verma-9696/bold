import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import About from "./pages/public/About";
import ErrorPage from "./components/util/ErrorPage";
import Contact from "./pages/public/Contact";
import Signup from "./pages/public/Signup";
import Profile from "./pages/protected/Profile";
import { PublicLayout } from "./layout/public/layout";
import { ProtectedLayoutWithAuth } from "./layout/private/layout";
import Chat from "./pages/protected/Chat";

// Centralized route paths
export const ROUTES = {
  PUBLIC: {
    ROOT: "/",
    LOGIN: "login",
    SIGNUP: "signup",
    ABOUT: "about",
    CONTACT: "contact",
  },
  PROTECTED: {
    ROOT: "/auth", // Base path for protected routes
    DASHBOARD: "", // Empty means it matches `/auth`
    CHAT: "chat",
    PROFILE: "profile",
  },
};

const router = createBrowserRouter([
  {
    path: ROUTES.PUBLIC.ROOT,
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.PUBLIC.LOGIN, element: <Login /> },
      { path: ROUTES.PUBLIC.SIGNUP, element: <Signup /> },
      { path: ROUTES.PUBLIC.ABOUT, element: <About /> },
      { path: ROUTES.PUBLIC.CONTACT, element: <Contact /> },
    ],
  },
  {
    path: ROUTES.PROTECTED.ROOT,
    element: <ProtectedLayoutWithAuth />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Chat /> }, // Matches `/auth`
      { path: ROUTES.PROTECTED.CHAT, element: <Chat /> }, // Matches `/auth/chat`
      { path: ROUTES.PROTECTED.PROFILE, element: <Profile /> }, // Matches `/auth/profile`
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
