import React from "react";

function Password(props) {
  return (
    <input
      {...props}
      type="password"
      name="password"
      placeholder="********"
      className="w-full p-3 mt-4 bg-gray-800 text-white border border-gray-600 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  );
}

export default Password;
