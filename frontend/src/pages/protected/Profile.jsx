import React from "react";
import { useSelector } from "react-redux";

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const Profile = () => {
  const user = useSelector((store) => store.auth.user);
  return (
    <div className="flex flex-col items-center pt-24">
      <div className="flex justify-center">
        <div className="avatar avatar-online">
          <div className="w-24 rounded-full ">
            <img src={user.avatar} />
          </div>
        </div>
      </div>
      <div className="pt-12">
        <p>
          <span>Name: </span> <span className="opacity-60">{user.name}</span>
        </p>
        <p>
          <span>Email: </span> <span className="opacity-60">{user.email}</span>
        </p>
        <p>
          <span>Role: </span> <span className="opacity-60">{user.role}</span>
        </p>
        <p>
          <span>Join at: </span>{" "}
          <span className="opacity-60">{formatDate(user.createdAt)}</span>
        </p>
      </div>
    </div>
  );
};

export default Profile;
