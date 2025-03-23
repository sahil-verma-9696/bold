import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/public/Home";
import Login from "./pages/public/Login";
import Dashboard from "./pages/protected/Dashboard";
import PublicLayout from "./components/layout/PublicLayout";
import ProtectedLayout from "./components/layout/ProtectedLayout";
import About from "./pages/public/About";
import ErrorPage from "./components/util/ErrorPage";
import Contact from "./pages/public/Contact";
import Signup from "./pages/public/Signup";

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
    path: "/dashboard",
    element: <ProtectedLayout />,
    errorElement: <ErrorPage />, // Show custom error UI
    children: [{ index: true, element: <Dashboard /> }],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
