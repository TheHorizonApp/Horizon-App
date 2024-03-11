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
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import "./Navbar.css";

function Navbar() {
  const pathname = usePathname();
  const shouldHideNavbar = pathname === "/" || pathname === "/login" || pathname === "/register";
  const pin = pathname === "/dashboard";

  if (shouldHideNavbar) {
    return null;
  }
  
  const navbarClasses = `navbar-hover bg-white dark:bg-black ${
    pin ? "navbar-pinned" : ""
  }`;

  return (
    <div className={navbarClasses}>
      <div className="navbar-icons-container">
        <h1 className="text-center py-4 font-semibold " >Horizon</h1>
        <div className="flex flex-col items-center space-y-10 my-10">
          <NavbarIcon
            icon={<FaHome size="24" />}
            visible={pin}
            href="/dashboard"
          />
          <NavbarIcon
            icon={<FaSearch size="24" />}
            visible={pin}
            href="/search"
          />
          <NavbarIcon
            icon={<FaCalendarAlt size="24" />}
            visible={pin}
            href="/calendar"
          />
          <NavbarIcon
            icon={<FaFileAlt size="24" />}
            visible={pin}
            href="/notes"
          />
          <NavbarIcon
            icon={<FaUser size="24" />}
            visible={pin}
            href="/profile"
          />
          {/* Note: Assuming ThemeSwitch is a component and not just an icon. If it's just an icon, it should be wrapped in a component or handled differently */}
          <NavbarIcon icon={<ThemeSwitch />} visible={pin} />
        </div>
        <div className="flex items-center justify-center mb-10">
          <NavbarIcon
            icon={<FaCog size="24" />}
            visible={pin}
            href="/settings"
          />
        </div>
      </div>
    </div>
  );
}

function NavbarIcon({ icon, visible, href }) {
  const iconClasses = `navbar-icon dark:text-white text-black ${
    visible ? "navbar-icon-visible" : ""
  }`;
  return href ? (
    <Link href={href} className={iconClasses}>
      {icon}
    </Link>
  ) : (
    <div className={iconClasses}>{icon}</div> // Fixed typo here from 'lassName' to 'className'
  );
}

export default Navbar;