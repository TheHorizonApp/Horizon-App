import React from "react";

const page = ({ params }) => {
  const colors = "bg-sky-400";
  return (
    <div className="p-10 bg-white dark:bg-black min-h-screen">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className={`${colors} w-6 h-6 rounded-full`} />
          <div className="text-2xl font-bold mb-0">Untitled Group</div>
        </div>
        <div className="text-md">Recently edited</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pt-10">
        <div class="relative w-full p-3 border">
          <div class="">
            
          </div>

        </div>
        <div class=" p-3 h-full border">
          <div class="">Box 1</div>
        </div>
        <div class="p-3 h-full border">
          <div class="">Box 1</div>
        </div>
        <div class="p-3 h-full border">
          <div class="">Box 1</div>
        </div>
        <div class="p-3 h-full border">
          <div class="">Box 1</div>
        </div>
        <div class="p-3 h-full border">
          <div class="">Box 1</div>
        </div>
        <div class="p-3 h-full border">
          <div class="">Box 1</div>
        </div>
      </div>
    </div>
  );
};

export default page;
