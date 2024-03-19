"use client";
import { useState } from "react";
import { useRedirectIfLoggedIn } from "./auth";

const RegisterForm = () => {
  useRedirectIfLoggedIn();
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comPass, setComPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oath: false,
          username: username,
          nickname: nickname,
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }
      router.push("/login");
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
      <div className="w-full space-y-3">
        <div>
          <div className="md:no-flex lg:flex lg:place-content-between lg:gap-4">
            <div className="mt-3">
              <label className="text-lg font-medium text-black dark:text-white p-2">
                Username
              </label>
              <input
                id="Username"
                type="text"
                placeholder="Username"
                required
                className="w-full px-4 py-3 rounded-lg text-md bg-[#EAEAEA] dark:bg-[#212121] text-black dark:text-white p-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mt-3">
              <label className="text-lg font-medium text-black dark:text-white p-2">
                Nickname
              </label>
              <input
                id="nickname"
                type="text"
                placeholder="Nickname (Optional)"
                className="w-full px-4 py-3 rounded-lg text-md bg-[#EAEAEA] dark:bg-[#212121] text-black dark:text-white p-2"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="">
          <label
            htmlFor="email"
            className="text-lg font-medium text-black dark:text-white p-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-lg text-md mt-1 bg-[#EAEAEA] dark:bg-[#212121] text-black dark:text-white p-2 "
            value={email} // Bind state to input
            onChange={(e) => setEmail(e.target.value)} // Update state on change
          />
        </div>
        <div>
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
            className="w-full px-4 py-3 rounded-lg text-md mt-1 bg-[#EAEAEA] dark:bg-[#212121] text-black dark:text-white"
            value={password} // Bind state to input
            onChange={(e) => setPassword(e.target.value)} // Update state on change
          />
        </div>
        <div>
          <label
            htmlFor="conPassword"
            className="text-lg font-medium text-black dark:text-white p-2"
          >
            Confirm Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-3 rounded-lg text-md mt-1 bg-[#EAEAEA] dark:bg-[#212121]  text-black dark:text-white"
            onChange={(e) => setComPass(comPass === false ? true : false)}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white dark:bg-white dark:text-black p-2 px-8 rounded-lg m-4 text-lg"
      >
        {isLoading ? "Register" : "Register"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default RegisterForm;
