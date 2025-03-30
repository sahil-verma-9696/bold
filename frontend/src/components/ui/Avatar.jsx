import React from "react";

function Avatar({ avatar, alt, online, ...props }) {
  return (
    <div {...props} className="relative w-16 h-16 bg-transparent">
      {/* Online Status Indicator */}
      <div
        className={`absolute z-10 size-3 rounded-full right-1 top-1 border-2 border-white ${
          online ? "bg-green-400" : "bg-gray-400"
        }`}
      ></div>

      {/* Hexagonal Image */}
      <img
        src={avatar || null}
        alt={alt || "User Avatar"}
        className="size-full object-cover mask mask-hexagon"
      />
    </div>
  );
}

export default Avatar;
