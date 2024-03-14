import React from "react";
import Link from "next/link";
import ThemeSwitch from "../components/ThemeSwitch";
import { useRedirectIfLoggedIn } from "../components/auth";

function Page() {
  const dynamicTitle = "Horizon".split("").map((char, index) => (
    <span key={index} className={`slide-up-char delay-${index}`}>
      {char}
    </span>
  ));

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-black flex flex-col">
      <header className="flex md:flex-row justify-between items-center p-4">
        <h1 className="text-lg md:text-xl font-semibold text-black dark:text-white">
          Logo
        </h1>
        <div className="flex items-center">
          <ThemeSwitch className="w-24 h-24" />
          <Link className="text-gray-600 dark:text-gray-400 ml-4" href="/login">
            Log in
          </Link>

          <div className="hidden md:block ml-4 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-bold">
            <Link href="/register">Get Started</Link>
          </div>
        </div>
      </header>
      <div className="flex-grow flex flex-col items-center justify-center px-2">
        <h2 className="text-6xl md:text-9xl font-bold text-black dark:text-white">
          {dynamicTitle}
        </h2>
        <p className="text-xl md:text-3xl text-black dark:text-white mt-4 text-center">
          The only app you need for maximum productivity.
        </p>
        <div className="md:hidden my-4 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-bold">
          <Link href="/register">Get Started</Link>
        </div>
      </div>
    </div>
  );
}

export default Page;
