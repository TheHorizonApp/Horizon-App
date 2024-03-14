import React from "react";

const Greeting = ({ name }) => {
  const getGreetingAndColor = () => {
    const hour = new Date().getHours();
    if (hour < 6) return ["Good Night", "text-indigo-900"]; // Late night to early morning
    if (hour < 12) return ["Good Morning", "text-blue-400"]; // Morning
    if (hour < 18) return ["Good Afternoon", "text-yellow-300"]; // Afternoon
    if (hour < 20) return ["Good Evening", "text-orange-500"]; // Evening
    return ["Good Night", "text-indigo-900"]; // Night
  };

  const [greeting, colorClass] = getGreetingAndColor();

  return (
    <h1 className={`text-3xl font-medium ${colorClass}`}>
      {greeting}{" "}
      <span className="text-indigo-500 drop-shadow-lg font-semibold">
        {name}
      </span>
    </h1>
  );
};

export default Greeting;
