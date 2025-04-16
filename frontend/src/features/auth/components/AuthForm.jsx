import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, signup } from "../authSlice";
import toast from "react-hot-toast";
import Email from "../../../pages/public/components/Email";
import Password from "../../../pages/public/components/Password";
import validateAuthForm from "../../../utils/validateAuthForm";
import { useNavigate } from "react-router-dom";

export default function AuthForm({ mode = "login", setIsLogin }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === "login";

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAuthForm(formData)) return;

    setIsSubmitting(true);
    const toastId = toast.loading(isLogin ? "Logging in..." : "Signing up...");

    try {
      const action = isLogin ? login : signup;
      const response = await dispatch(action(formData)).unwrap();
      toast.success(`Welcome, ${response.user.name}!`, { id: toastId });
      navigate("/lobby");
    } catch (err) {
      toast.error(err?.message || "Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        {isLogin ? "Login" : "Signup"}
      </h2>

      <Email value={formData.email} onChange={handleChange} />
      <Password value={formData.password} onChange={handleChange} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
      >
        {isSubmitting ? "Please wait..." : isLogin ? "Login" : "Signup"}
      </button>

      <div className="mt-4 text-center">
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
    </form>
  );
}
