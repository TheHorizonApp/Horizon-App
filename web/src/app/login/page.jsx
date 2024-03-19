"use client";
import LoginForm from "../../components/LoginForm";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black dark:text-white dark:bg-black px-2">
      <h1 className="text-4xl text-center font-bold">Log in</h1>
      <div className="flex flex-col p-6 w-full justify-center items-center">
        <div
          className="flex w-full items-center justify-center p-3 m-2 bg-gray-900 rounded-lg cursor-pointer max-w-xs text-center"
        >
          <span className="text-white">Continue with Google</span>
        </div>
        <div className="flex w-full items-center justify-center p-3 m-2 bg-gray-900 rounded-lg cursor-pointer max-w-xs text-center">
          <span className="text-white">Continue with Apple</span>
        </div>
        <hr className="border-t border-gray-300 w-full max-w-md my-4 mt-8" />
      </div>
      <LoginForm />
    </div>
  );
};

export default Page;
