import ToDo from "@/components/ToDo";

const page = () => {
  const name = "John Doe";
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
    <div className="flex h-screen">
      <div className="flex-grow m-4 mr-0">
        {/* Main content goes here */}
        <h1 className={`text-3xl font-medium ${colorClass}`}>
          {greeting}{" "}
          <span className="text-indigo-500 drop-shadow-lg font-semibold">
            {name}
          </span>
        </h1>
        {/* TODO: fix where that  */}
        <div className="flex flex-col space-y-4 pt-4 h-[93vh]">
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
        <ToDo />
      </div>
    </div>
  );
};

export default page;
