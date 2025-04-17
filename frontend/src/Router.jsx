import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/public/home/Home";
import About from "./pages/public/about/About";
import Contact from "./pages/public/contact/Contact";
import Lobby from "./pages/protected/lobby/Lobby";
import ErrorPage from "./components/util/ErrorPage";
import { AuthPage } from "./pages/public/authentication/AuthPage";

import { PublicLayout } from "./pages/public/layout";
import ProtectedLayout from "./pages/protected/layout";
import { ProtectedRoute } from "./components/auth/Protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "lobby",
        element: (
          <ProtectedRoute>
            <Lobby />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
