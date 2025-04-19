import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login, signup } from "../../features/auth/authSlice";
import Email from "../ui/Email";
import Password from "../ui/Password";
import validateAuthForm from "../../utils/validateAuthForm";
import { useLocation, useNavigate } from "react-router-dom";
import { forgotPassword, resetPassword } from "../../features/auth/authService";

export default function AuthForm({ mode = "login", setIsLogin, setMode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    resetToken: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isForgotPassword = mode === "forgot-password";
  const isResetPassword = mode === "reset-password";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const email = params.get("email");
    const urlMode = params.get("mode");

    if (urlMode === "reset" && email && token) {
      setMode("reset-password");
      setFormData((prev) => ({ ...prev, email, resetToken: token }));
    } else {
      setMode("login");
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Processing...");

    setIsSubmitting(true);

    try {
      switch (mode) {
        case "forgot-password":
          if (!formData.email) throw new Error("Email is required");
          await forgotPassword({ email: formData.email });
          toast.success("Password reset link sent to your email!", {
            id: toastId,
          });
          setMessage("A password reset link has been sent to your email.");
          break;

        case "reset-password":
          if (!formData.password) throw new Error("Password is required");

          await resetPassword({
            email: formData.email,
            token: formData.resetToken,
            newPassword: formData.password,
          });

          toast.success("Password has been reset successfully!", {
            id: toastId,
          });
          setMode("login");
          setFormData({
            email: "",
            password: "",
            resetToken: "",
          });

          break;

        case "login":
        case "signup":
          if (!validateAuthForm(formData)) {
            toast.dismiss(toastId);
            return;
          }
          const action = mode === "login" ? login : signup;
          const response = await dispatch(action(formData)).unwrap();
          toast.success(`Welcome, ${response.user.name}!`, { id: toastId });
          navigate("/lobby");
          break;

        default:
          toast.error("Unknown mode", { id: toastId });
          break;
      }
    } catch (err) {
      console.error("Error during form submission:", err); // log error for better visibility
      toast.error(err?.message || "Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4 dark:text-white">
        {isLogin
          ? "Login"
          : isSignup
          ? "Signup"
          : isForgotPassword
          ? "Forgot Password"
          : "Reset Password"}
      </h2>

      <Email value={formData.email} onChange={handleChange} />

      {(isLogin || isSignup || isResetPassword) && (
        <Password
          value={formData.password}
          name="password"
          onChange={handleChange}
          placeholder={isResetPassword ? "New Password" : "Password"}
        />
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        {isSubmitting
          ? "Please wait..."
          : isLogin
          ? "Login"
          : isSignup
          ? "Signup"
          : isForgotPassword
          ? "Send Reset Link"
          : "Reset Password"}
      </button>

      {message && <p className="mt-4 text-center text-green-500">{message}</p>}

      {!isForgotPassword && !isResetPassword && (
        <div className="mt-4 text-center dark:text-white">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Signup
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </div>
      )}

      {(isForgotPassword || isResetPassword) && (
        <div className="mt-4 text-center dark:text-white">
          <span
            onClick={() => setMode("login")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Back to Login
          </span>
        </div>
      )}

      {!isForgotPassword && !isResetPassword && (
        <div className="mt-4 text-center dark:text-white">
          <span
            onClick={() => setMode("forgot-password")}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Forgot Password?
          </span>
        </div>
      )}
    </form>
  );
}
