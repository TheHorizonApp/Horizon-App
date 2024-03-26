import ToDo from "@/components/ToDo";
import { Suspense } from "react";
import loadingToDos from "./loading";

const page = () => {
  const name = "John Doe";
  const getGreetingAndColor = () => {
    const hour = new Date().getHours();
    if (hour < 6) return ["Good Night"]; // Late night to early morning
    if (hour < 12) return ["Good Morning"]; // Morning
    if (hour < 18) return ["Good Afternoon"]; // Afternoon
    if (hour < 20) return ["Good Evening"]; // Evening
    return ["Good Night"]; // Night
  };

  const [greeting, colorClass] = getGreetingAndColor();

  return (
    <div className="flex h-screen">
      <div className="flex-grow m-4 mr-0">
        {/* Main content goes here */}
        <h1 className={`text-xl font text-[#4C4C4C] select-none`}>
          {greeting}{" "}
          <span className="drop-shadow-lg text-black dark:text-white">
            {name}!
          </span>
        </h1>
        {/* TODO: fix where that  */}
        <div className="flex flex-col space-y-4 pt-4 h-[91vh]">
          <div className="border border-gray-500 rounded-xl p-4 h-full flex-grow">
            Calendar
          </div>
          <div className="flex space-x-4 h-2/5">
            <div className="border border-gray-500 rounded-xl p-4 flex-grow w-1/2">
              Quick Notes
            </div>
            <div className="border border-gray-500 rounded-xl p-4 flex-grow w-1/2">
              Deadlines
            </div>
          </div>
        </div>
      </div>
      {/* this will be hidden if it gets to small */}
      <div className="w-3/12 border-slate-700 sm: hidden md:block">
        <Suspense fallback={<loadingToDos />}>
          <ToDo />
        </Suspense>
      </div>
    </div>
  );
};

export default page;
