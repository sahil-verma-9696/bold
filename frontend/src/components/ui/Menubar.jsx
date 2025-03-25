"use client";
import React, { useState, useRef, useEffect } from "react";

const Menubar = ({ options = [], children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={menuRef}>
      {/* Three Dots Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-1 cursor-pointer rounded-full p-[2px] hover:bg-gray-200 dark:hover:bg-white transition"
      >
        {children}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
          {options?.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                option.type !== "text" && option.action();
                option.type !== "text" && setIsOpen(false);

                option.type === "button" && option.action();
                option.type === "button" && setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menubar;
