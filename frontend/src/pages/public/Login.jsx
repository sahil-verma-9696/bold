import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { LoginForm } from "../../components/forms/LoginForm";
import { apiRequest } from "../../utils/apiHelper";
import { createSocketMiddleware } from "./../../redux/middlewares/socket";

import { store } from "../../redux/store";

const DEBUG = true; // ✅ Toggle for debugging logs

export default function Login() {
  const navigate = useNavigate(); // ✅ Correct way to use navigation
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitHandler(formData) {
    const { email, password } = formData;

    console.log(formData);

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      if (DEBUG) console.log("Sending API request to signup..."); // ✅ Debug log
      const response = await apiRequest("/api/auth/login", "POST", formData);

      if (DEBUG) console.log("Login Response:", response); // ✅ Debug log
      toast.success("Account created successfully!");
      localStorage.setItem("userId", response.payload.user._id);

      const socketMiddleware = createSocketMiddleware(
        "http://localhost:5000",
        store
      );
      store.dispatch = socketMiddleware(store)(store.dispatch);

      navigate("/auth");
    } catch (error) {
      console.error("Login failed:", error); // ✅ Always log errors
      toast.error(error.message || "Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <LoginForm submitHandler={submitHandler} isSubmitting={isSubmitting} />
        <SignupPrompt />
      </div>
    </div>
  );
}

function SignupPrompt() {
  return (
    <p className="pt-4">
      Already have an account?{" "}
      <Link to="/signup" className="link link-primary">
        Signup
      </Link>
    </p>
  );
}
