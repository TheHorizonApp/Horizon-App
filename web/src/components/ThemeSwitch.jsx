"use client";
import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FaMoon } from "react-icons/fa";
import { BsSunFill as BSsunFill } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";


export default function ThemeSwitch() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") setDarkMode(true);
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="relative w-16 h-8 flex items-center dark:bg-gray-900 bg-teal-400 cursor-pointer rounded-full p-1" onClick={() => setDarkMode(!darkMode)}>
      <IoMoon className="absolute text-white" size={18} />
      <div className="absolute bg-white dark:bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300" style={darkMode ? { left: "2px" } : { right: "2px" }}></div>
      <BSsunFill className="ml-auto  text-yellow-400 " size={18} />
    </div>
  );
}
