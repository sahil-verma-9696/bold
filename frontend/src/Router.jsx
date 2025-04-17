import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/public/home/Home";
import About from "./pages/public/about/About";
import Contact from "./pages/public/contact/Contact";
import Lobby from "./pages/protected/lobby/Lobby";
import ErrorPage from "./components/ErrorPage";
import { AuthPage } from "./pages/public/authentication/AuthPage";

import { PublicLayout } from "./pages/public/layout";
import ProtectedLayout from "./pages/protected/layout";

export const ROUTES = {
  PUBLIC: {
    ROOT: "/",
    ABOUT: "about",
    CONTACT: "contact",
    AUTH: "auth",
  },
  PROTECTED: {
    ROOT: "/",
    LOBBY: "lobby",
    SETTINGS: "settings",
  },
};

const router = createBrowserRouter([
  {
    path: ROUTES.PUBLIC.ROOT,
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: ROUTES.PUBLIC.ABOUT, element: <About /> },
      { path: ROUTES.PUBLIC.CONTACT, element: <Contact /> },
      { path: ROUTES.PUBLIC.AUTH, element: <AuthPage /> },
    ],
  },
  {
    path: ROUTES.PROTECTED.ROOT,
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [{ path: ROUTES.PROTECTED.LOBBY, element: <Lobby /> }],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
