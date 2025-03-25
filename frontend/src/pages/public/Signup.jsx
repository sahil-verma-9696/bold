import React, { useRef } from "react";
import UsernameInput from "../../components/ui/UsernameInput";
import EmailInput from "../../components/ui/EmailInput";
import PasswordInput from "../../components/ui/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate(); // ✅ Correct way to use navigation

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);

  async function submitHandler(event) {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const name = nameRef.current?.value;

    if (!email || !password || !name) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      // Show loading toast
      const loadingToast = toast.loading("Signing up...");

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // important to recieve cookie from server
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      //   console.log(data); // Debugging

      // Remove loading toast before showing success/error
      toast.dismiss(loadingToast);

      if (!response.ok || data.type === "error") {
        throw new Error(data.message || "Signup failed. Please try again.");
      }
      toast.success(data.message || "Account created successfully!");

      // navigate to auth
      navigate("/auth");
    } catch (error) {
      // Remove loading toast before showing error
      toast.dismiss();
      toast.error(error.message || "Signup failed. Please try again.");
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <EmailInput ref={emailRef} name={"email"} />
          <PasswordInput ref={passwordRef} name="password" />
          <UsernameInput ref={nameRef} name="name" />
          <button type="submit" className="btn btn-active">
            Signup
          </button>
        </form>
        <p className="pt-4">
          Not have an account ?{" "}
          <Link to={"/login"} className="link link-primary">
            login
          </Link>
        </p>
      </div>
    </div>
  );
}
