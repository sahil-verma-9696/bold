import { useState } from "react";
import AuthForm from "../../../features/auth/components/AuthForm";
import css from "./styles/style.module.css";
export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className={css.auth}>
      <AuthForm mode={isLogin ? "login" : "signup"} setIsLogin={setIsLogin} />
    </div>
  );
}
// Optional: Setup socket middleware here if needed
// const socketMiddleware = createSocketMiddleware("http://localhost:5000", store, response.user._id);
// store.dispatch = socketMiddleware(store)(store.dispatch);
