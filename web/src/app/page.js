import React from 'react';
import Link from 'next/link';
import ThemeSwitch from '../components/ThemeSwitch';

function Page() {
  const dynamicTitle = "Horizon".split('').map((char, index) => (
    <span key={index} className={`slide-up-char delay-${index}`}>{char}</span>
  ));

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-black flex flex-col">
      <header className="flex flex-col md:flex-row justify-between items-center p-4">
        <h1 className="text-lg md:text-xl font-semibold text-black dark:text-white">Logo</h1>
        <div className="flex items-center">
          <ThemeSwitch className="w-24 h-24"/>
          <div className="text-gray-600 dark:text-gray-400 ml-4">
            Log In
          </div>
          <div className="ml-4 bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-bold">
            <Link href="/note">
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <div className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-6xl md:text-9xl font-bold text-black dark:text-white">
          {dynamicTitle}
        </h2>
        <p className="text-xl md:text-3xl text-black dark:text-white mt-4">The only app you need for maximum productivity.</p>
      </div>
    </div>
  );
}

export default Page;