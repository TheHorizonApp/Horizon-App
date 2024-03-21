"use client";
import { useState, useEffect, Suspense, lazy } from "react";
import DashboardLoadingSkeleton from "./DashboardLoadingSkeleton";

// Lazily import ToDo component
const ToDo = lazy(() => import("@/components/ToDo"));

const Page = () => {
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from the backend API
        const response = await fetch(
          `https://localhost:8080/api/dashboard/${id}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setData(responseData);
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="flex-grow">
        {/* Main content goes here */}
        <h1 className={`text-3xl font-medium m-3 ${colorClass}`}>
          {greeting}{" "}
          <span className="text-indigo-500 drop-shadow-lg font-semibold">
            {name}
          </span>
        </h1>
        <Suspense fallback={<DashboardLoadingSkeleton />}>
          {loading ? (
            <DashboardLoadingSkeleton />
          ) : (
            <div className="flex flex-col space-y-4 p-4 h-[93vh]">
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
          )}
        </Suspense>
      </div>
      <div className="w-1/5 border-l border-slate-700">
        <div className="m-6 mt-8">
          {/* ToDo component */}
          <ToDo />
        </div>
      </div>
    </div>
  );
};

export default Page;
