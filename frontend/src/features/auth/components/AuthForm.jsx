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
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? "Login" : "Signup"}</h2>

      <Email value={formData.email} onChange={handleChange} />
      <Password value={formData.password} onChange={handleChange} />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Please wait..." : isLogin ? "Login" : "Signup"}
      </button>

      <div>
        {isLogin ? (
          <>
            Don’t have an account?{" "}
            <span onClick={() => setIsLogin(false)}>Signup</span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span onClick={() => setIsLogin(true)}>Login</span>
          </>
        )}
      </div>
    </form>
  );
}
