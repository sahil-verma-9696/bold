import { Toaster } from "react-hot-toast";
import { Header } from "./components/Header";
import css from "./styles/style.module.css";
import { Outlet } from "react-router-dom";

export function PublicLayout() {
  return (
    <div className={css.page}>
      <Header />
      <main className={css.publicMain}>
        <Outlet />
      </main>
    </div>
  );
}
