"use client";
import { useState } from "react";
import { useRedirectIfLoggedIn } from "./auth";

const LoginForm = () => {
  useRedirectIfLoggedIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log(email);
      console.log(password);
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log(response);
      console.log(email);
      console.log(password);
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center space-y-5"
    >
      <div>
        {/* <hr className="border-t border-gray-300 my-4" /> */}
        <div className="">
          <label
            htmlFor="email"
            className="text-lg font-medium text-black dark:text-white p-2"
          >
            Username or email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Username or email"
            required
            className="w-full px-4 py-3 rounded-lg text-md mt-1 bg-[#EAEAEA] dark:bg-[#212121] text-[#7C7C7C]"
            value={email} // Bind state to input
            onChange={(e) => setEmail(e.target.value)} // Update state on change
          />
        </div>
        <div className="pt-5">
          <label
            htmlFor="password"
            className="text-lg font-medium text-black dark:text-white p-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-lg text-md mt-1 bg-[#EAEAEA] dark:bg-[#212121] text-[#7C7C7C]"
            value={password} // Bind state to input
            onChange={(e) => setPassword(e.target.value)} // Update state on change
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white dark:bg-white dark:text-black p-2 px-8 rounded-lg mt-4 text-lg"
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default LoginForm;
