"use client";
import React from "react";
import { FaHome, FaSearch, FaCalendarAlt, FaFileAlt, FaUser, FaCog } from "react-icons/fa";
import { usePathname } from "next/navigation";

function Navbar({ darkMode }) {
  const pathname = usePathname();
  const shouldHideNavbar =
    pathname === "/" || pathname === "/login" || pathname === "/register";

  if (shouldHideNavbar) {
    return null;
  }
  return (
    <div className={`navbar-hover bg-white dark:bg-black `}>
      <div className="navbar-icons-container">
        <div className="flex flex-col items-center space-y-10 my-20">
          <NavbarIcon icon={<FaHome size="24" />} />
          <NavbarIcon icon={<FaSearch size="24" />} />
          <NavbarIcon icon={<FaCalendarAlt size="24" />} />
          <NavbarIcon icon={<FaFileAlt size="24" />} />
          <NavbarIcon icon={<FaUser size="24" />} />
        </div>

        <div className="flex items-center justify-center mb-10">
          <NavbarIcon icon={<FaCog size="24" />} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

function NavbarIcon({ icon, darkMode }) {
  return <div className={`navbar-icon dark:text-white text-black`}>{icon}</div>;
}

export default Navbar;
