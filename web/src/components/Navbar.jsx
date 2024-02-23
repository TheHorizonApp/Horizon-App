"use client";
import React from "react";
import {
  FaHome,
  FaSearch,
  FaCalendarAlt,
  FaFileAlt,
  FaUser,
  FaCog,
} from "react-icons/fa";
import { usePathname } from "next/navigation";

function Navbar({ darkMode }) {
  const pathname = usePathname();
  const shouldHideNavbar = pathname === "/" || pathname === "/login" || pathname === "/register";
  const pin = pathname === "/dashboard";

  if (shouldHideNavbar) {
    return null;
  }

  const navbarClasses = `navbar-hover bg-white dark:bg-black ${pin ? "navbar-pinned" : ""}`;

  return (
    <div className={navbarClasses}>
      <div className="navbar-icons-container">
        <div className="flex flex-col items-center space-y-10 my-20">
          {/* Pass `pin` to each NavbarIcon component */}
          <NavbarIcon icon={<FaHome size="24" />} visible={pin} />
          <NavbarIcon icon={<FaSearch size="24" />} visible={pin} />
          <NavbarIcon icon={<FaCalendarAlt size="24" />} visible={pin} />
          <NavbarIcon icon={<FaFileAlt size="24" />} visible={pin} />
          <NavbarIcon icon={<FaUser size="24" />} visible={pin} />
        </div>

        <div className="flex items-center justify-center mb-10">
          <NavbarIcon icon={<FaCog size="24" />} visible={pin} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}

function NavbarIcon({ icon, visible, darkMode }) {
  const iconClasses = `navbar-icon dark:text-white text-black ${visible ? "navbar-icon-visible" : ""}`;

  return <div className={iconClasses}>{icon}</div>;
}

export default Navbar;
