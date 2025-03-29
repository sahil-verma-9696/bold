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
import { useDispatch, useSelector } from "react-redux";
import Menubar from "./Menubar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearSocket } from "../../redux/slices/authSlice";
import { apiRequest } from "../../utils/apiHelper";

function PrivateHeader() {
  const { user, socket } = useSelector((store) => store.auth);
  const navigate = useNavigate(); // ✅ Correct way to use navigation
  const dispatch = useDispatch();


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
