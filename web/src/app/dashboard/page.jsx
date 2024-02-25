import React from "react";
import ToDo from "@/components/ToDo";

const page = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-grow">
        {/* Main content goes here */}
        Main content
      </div>
      <div className="w-1/5 border-l border-slate-700">
        <div className="m-6 mt-8">
          <ToDo />
        </div>
      </div>
    </div>
  );
};

export default page;
