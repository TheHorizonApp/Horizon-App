import Image from "next/image";
import Calendar from "@/assets/calendar.svg";

const DashboardLoadingSkeleton = () => {
  return (
    <div className="flex h-screen">
      <div className="flex-grow">
        <div className="flex flex-col space-y-4 p-4 h-[93vh]">
          <div
            className="bg-gray-200 border border-gray-500 rounded-xl p-4 h-full flex-grow flex items-center justify-center animate-pulse "
            style={{ animationDelay: "0.2s" }}
          >
            {/* Loading skeleton for Calendar */}
            {/* <Image
              className="flex items-center justify-center"
              src={Calendar}
              width={100}
              height={100}
              alt="Pin note"
            /> */}
          </div>
          <div className="flex space-x-4 h-2/5">
            <div
              className="bg-gray-200 border border-gray-500 rounded-xl p-4 flex-grow w-1/2 animate-pulse "
              style={{ animationDelay: "0.4s" }}
            >
              {/* Loading skeleton for Quick Notes */}
            </div>
            <div
              className="bg-gray-200 border border-gray-500 rounded-xl p-4 flex-grow w-1/2 animate-pulse "
              style={{ animationDelay: "0.4s" }}
            >
              {/* Loading skeleton for Deadlines */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoadingSkeleton;
