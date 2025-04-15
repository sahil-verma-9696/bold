import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import css from "./styles/style.module.css";
import { Protected } from "../../features/auth/components/Protected";
function ProtectedLayout() {
  return (
    <div className={css.protectedPage}>
      <main className={css.protectedMain}>
        <Outlet />
      </main>
    </div>
  );
}

export default Protected(ProtectedLayout);
