const LoadingSkeleton = ({ title, body, date, delay }) => {
  // const titleWidth = `${(title.length / 20) * 100}%`;
  const bodyWidth = `${(body.length / 50) * 100}%`;
  const dateWidth = `${(date.length / 50) * 100}%`;

  const animationDelay = `${delay * 0.1}s`;

  // Calculate the number of lines based on the length of the body text
  const lineLength = 40; // Adjust as needed
  const numLines = Math.ceil(body.length / lineLength);

  // Generate an array of empty lines
  const bodyLines = Array.from({ length: numLines }, (_, index) => index);

  return (
    <div
      className="relative w-full aspect-square border-[0.5px] border-[#2D2F2D] rounded-lg flex p-4 animate-pulse"
      style={{ animationDelay: animationDelay }}
    >
      <div className="flex flex-col w-full">
        <div
          className={`text-xl font-bold h-8 bg-gray-300 rounded-md mb-4 mr-8`}
          // style={{ width: titleWidth }}
        ></div>
        {bodyLines.map((line, index) => (
          <div
            key={index}
            className={`text-[#2D2F2D] bg-gray-200 rounded-md mb-2 w-full`}
            style={{ height: "1rem" }}
          ></div>
        ))}
        <div className="absolute top=0 right-0 mx-4 bg-gray-200 w-6 h-6 rounded-lg"></div>
        <div
          className="absolute bottom-4 left-4 text-xs p-2 rounded-lg bg-gray-200"
          style={{ width: dateWidth }}
        ></div>
        <div className="absolute bottom-0 right-0 text-xs h-5 w-5 m-5 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;

// const LoadingSkeleton = () => {
//   // Placeholder data to simulate loading
//   const placeholderNote = {
//     title: "Loading...",
//     body: "Loading...",
//     updatedAt: "Loading...",
//     tag: "bg-gray-300", // Use a placeholder tag color
//   };

//   return (
//     <div className="relative w-full aspect-square border-[0.5px] border-[#2D2F2D] rounded-lg flex p-4 animate-pulse">
//       <div className="flex flex-col text-md space-y-2">
//         <div className={`text-xl font-bold h-8 bg-gray-300 rounded-md w-full`}>
//           {/* {placeholderNote.title} */}
//         </div>
//         <div className={`text-[#2D2F2D] h-16 bg-gray-200 rounded-md w-full`}>
//           {/* {placeholderNote.body} */}
//         </div>
//       </div>
//       <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
//       <div className="absolute bottom-0 left-0 text-xs p-4 text-[#2D2F2D] dark:text-[#2D2F2D] rounded-lg">
//         <div className="h-3 bg-gray-200 rounded-md w-16"></div>
//       </div>
//       <div
//         className={`${placeholderNote.tag} absolute bottom-0 right-0 text-xs h-5 w-5 m-5 rounded-full`}
//       ></div>
//     </div>
//   );
// };

// export default LoadingSkeleton;
