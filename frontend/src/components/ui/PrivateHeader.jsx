import {
  ArrowLeft,
  ArrowRight,
  LogOut,
  Mail,
  Settings,
  UserCheck,
  UserPen,
} from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import Menubar from "./Menubar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function PrivateHeader() {
  const user = useSelector((store) => store.auth.user);
  const navigate = useNavigate(); // ✅ Correct way to use navigation

  async function handleLogout() {
    try {
      const loadingToast = toast.loading("Loging out...");
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      toast.dismiss(loadingToast);
      if (!response.ok || data.type === "error") {
        throw new Error(data.message || "Signup failed. Please try again.");
      }
      toast.success(data.message || "Account created successfully!");
      navigate("/");
    } catch (error) {}
    console.log("logout");
  }
  return (
    <div className="sticky top-4 flex justify-between">
      <nav>
        {/* TODO: logic */}
        <ul className="flex gap-2">
          <li className="size-8 flex justify-center items-center rounded-full cursor-pointer bg-white text-black">
            <ArrowLeft />
          </li>
          <li className="size-8 flex justify-center items-center rounded-full cursor-pointer bg-white text-black">
            <ArrowRight />
          </li>
        </ul>
      </nav>

      <Menubar
        options={[
          {
            label: (
              <p className="flex justify-between">
                <UserCheck />
                {user.name}
              </p>
            ),
            type: "text",
          },
          {
            label: (
              <p className="flex justify-between">
                <Mail />
                {user.email.split("@")[0]}
              </p>
            ),
            type: "text",
          },
          {
            label: (
              <p className="flex justify-between cursor-pointer">
                <UserPen />
                Profile
              </p>
            ),
            type: "button",
            action: function () {
              navigate("/auth/profile");
            },
          },
          {
            label: (
              <p className="flex justify-between text-red-400 cursor-pointer">
                <LogOut />
                Logout
              </p>
            ),
            type: "button",
            action: handleLogout,
          },
        ]}
      >
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img src={user.avatar} />
          </div>
        </div>
      </Menubar>
    </div>
  );
}

export default PrivateHeader;
