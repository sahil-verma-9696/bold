import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { apiRequest } from "../../utils/apiHelper";
import { SignupForm } from "../../components/forms/SignupForm";

const DEBUG = true; // ✅ Toggle for debugging logs

export default function Signup() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submitHandler(formData) {
    if (DEBUG) console.log("Form Submitted:", formData); // ✅ Debug log

    if (!formData.email || !formData.password) {
      if (DEBUG) console.warn("Validation failed: Missing fields"); // ✅ Debug log
      return toast.error("Please fill in all fields.");
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (DEBUG) console.log("Sending API request to signup..."); // ✅ Debug log
      const response = await apiRequest("/api/auth/signup", "POST", formData);

      if (DEBUG) console.log("Signup Response:", response); // ✅ Debug log
      toast.success("Account created successfully!");
      navigate("/auth");
    } catch (error) {
      console.error("Signup failed:", error); // ✅ Always log errors
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <SignupForm submitHandler={submitHandler} isSubmitting={isSubmitting} />
        <LoginPrompt />
      </div>
    </div>
  );
}

function LoginPrompt() {
  return (
    <p className="pt-4">
      Already have an account?{" "}
      <Link to="/login" className="link link-primary">
        Login
      </Link>
    </p>
  );
}
