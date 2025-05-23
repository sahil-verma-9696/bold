import React from "react";

const Avatar = ({ size = "sm", img, css, showOnline }) => {
  if (size === "md")
    return (
      <div
        className={`relative w-fit p-1  ${css} rounded-full size-24 bg-white dark:bg-[#131416]`}
      >
        {img ? (
          <img src={img} alt="User Avatar" className="size-full rounded-full" />
        ) : (
          <div className="size-24 dark:text-white flex justify-center items-center">
            No Img
          </div>
        )}
        <div className="size-6 p-1 absolute bottom-1 right-2 dark:bg-[#131416] rounded-full">
          <div
            className={`size-full ${
              showOnline ? "bg-green-400" : "bg-gray-400"
            } rounded-full`}
          ></div>
        </div>
      </div>
    );

  // TODO
  return (
    <div
      className={`relative w-fit p-1  ${css} rounded-full size-14 bg-white dark:bg-[#131416]`}
    >
      <img src={img} alt="User Avatar" className="size-full rounded-full" />
      <div className="size-3 p-[1px] absolute bottom-0 right-1 dark:bg-[#131416] rounded-full">
        <div
          className={`size-full ${
            showOnline ? "bg-green-400" : "bg-gray-400"
          } rounded-full`}
        ></div>
      </div>
    </div>
  );
};

export default Avatar;
