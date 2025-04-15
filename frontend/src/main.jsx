import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import css from "./index.module.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import router from "./Router.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <Toaster />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
