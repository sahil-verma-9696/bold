import React, { useRef } from "react";
import EmailInput from "../../components/ui/EmailInput";
import PasswordInput from "../../components/ui/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setOnlineUser, setSocket } from "./../../redux/slices/authSlice";

export default function Login() {
  const navigate = useNavigate(); // ✅ Correct way to use navigation
  const dispatch = useDispatch();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  async function submitHandler(event) {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      // Show loading toast
      const loadingToast = toast.loading("Login in...");

      const response = await fetch("http://localhost:5000/api/auth/login", {
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
        throw new Error(data.message || "Login failed. Please try again.");
      }
      toast.success(data.message || "Account created successfully!");
      console.log(data);
      // console.log(data?.payload?._id);
      const socket = io("http://localhost:5000", {
        withCredentials: true,
        query: {
          userId: data?.payload?.user.id,
        },
      });
      // connecting with socket
      socket.on("connect", () => {
        console.log("Successfully connected to " + socket.id); // x8WIv7-mJelg7on_ALbx
      });
      socket.on("getOnlineUsers", (userIds) => {
        dispatch(setOnlineUser(userIds));
      });
      dispatch(setSocket(socket));
      // navigate to auth
      navigate("/auth");
    } catch (error) {
      // Remove loading toast before showing error
      toast.dismiss();
      toast.error(error.message || "Login failed. Please try again.");
    }
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <EmailInput ref={emailRef} name={"email"} />
          <PasswordInput ref={passwordRef} name={"password"} />
          <button className="btn btn-active">Login</button>
        </form>
        <p className="pt-4">
          Not have an account ?{" "}
          <Link to={"/signup"} className="link link-primary">
            {" "}
            Signup{" "}
          </Link>
        </p>
      </div>
    </div>
  );
}
