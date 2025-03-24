import { ArrowLeft, ArrowRight, LogOut } from "lucide-react";
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
      navigate("/")
    } catch (error) {}
    console.log("logout");
  }
  return (
    <div className="sticky top-0 flex justify-between">
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
          { label: user.name, type: "text" },
          {
            label: (
              <p className="flex justify-between text-red-400">
                Logout <LogOut />
              </p>
            ),
            type: "button",
            action: handleLogout,
          },
        ]}
      >
        <div className="size-12 bg-white rounded-full overflow-hidden">
          <img className="size-full object-cover" src={user.avatar} alt="" />
        </div>
      </Menubar>
    </div>
  );
}

export default PrivateHeader;
