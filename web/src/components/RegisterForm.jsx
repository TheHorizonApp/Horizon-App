"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comPass, setComPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log(email);
      console.log(password);
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }
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
      <div className="w-full space-y-3">
        <div>
          <div className="flex place-content-between gap-4">
            <div >
              <label className="text-lg font-medium text-black dark:text-white p-2">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                required
                className="w-full px-4 py-3 rounded-lg text-md bg-[#EAEAEA] dark:bg-[#212121] text-black"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-lg font-medium text-black dark:text-white p-2">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                required
                className="w-full px-4 py-3 rounded-lg text-md bg-[#EAEAEA] dark:bg-[#212121] text-black"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
            className="w-full px-4 py-3 rounded-lg text-md mt-1 bg-[#EAEAEA] dark:bg-[#212121] text-[#7C7C7C]"
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
            className="w-full px-4 py-3 rounded-lg text-md mt-1 bg-[#EAEAEA] dark:bg-[#212121] text-[#7C7C7C]"
            value={password} // Bind state to input
            onChange={(e) => setPassword(e.target.value)} // Update state on change
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="text-lg font-medium text-black dark:text-white p-2"
          >
            Confirm Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Confirm Password"
            required
            className="w-full px-4 py-3 rounded-lg text-md mt-1 bg-[#EAEAEA] dark:bg-[#212121] text-[#7C7C7C]"
            onChange={(e) => setComPass(comPass === false ? true : false)}
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-black text-white dark:bg-white dark:text-black p-2 px-8 rounded-lg mt-4 text-lg"
      >
        {isLoading ? "Register" : "Register"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
};

export default LoginForm;
