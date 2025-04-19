import { useEffect, useState } from "react";
import AuthForm from "../../../components/auth/AuthForm";
import { useNavigate } from "react-router-dom";

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const handleModeChange = (newMode) => setMode(newMode);

  useEffect(() => {
    localStorage.getItem("userId") ? navigate("/lobby") : null;
  });

  return (
    <div className="h-[94vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <AuthForm mode={mode} setIsLogin={setIsLogin} setMode={setMode} />
      </div>
    </div>
  );
}
