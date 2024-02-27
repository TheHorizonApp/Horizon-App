import React from "react";

const page = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-grow">
        {/* Main content goes here */}
        Main content
      </div>
      <div className="w-1/5 border-l border-slate-700">
        <div className="m-8">
          <div className="flex justify-between pb-2">
            <div className="">To-Do's (&lt;Number&gt;):</div>
            <div className=""> + </div>
          </div>
          <div className="bg-red-500 h-8 w-full fex ">
            <div className="flex justify-between"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
