"use client";
import React, { useEffect, useState } from "react";
const toDo = () => {
  const [colorClass, setColorClass] = useState("bg-sky-200");
  const [toDos, setToDos] = useState(null);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:8080/api/todos");
        const jsonData = await response.json();
        setToDos(jsonData);
        setSize(jsonData.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="flex justify-between pb-2">
        <div className="font-bold">To-Do's ({size ? size : 0})</div>
        <div className="font-bold cursor-pointer"> + </div>
      </div>
      {/* This si wahts gonna get mapped for a fetch */}
      <div>
        {size > 0 ? (
          toDos.map((todo) => (
            <div
              key={todo.id}
              className="bg-[#323232] rounded-lg w-full flex justify-between mb-2"
            >
              <div className="flex items-center px-3 py-2">
                <div className="bg-[#D9D9D9] h-4 w-4 rounded-full"></div>
                <div className="px-2 text-white">{todo.title}</div>
              </div>
              {/* Color coordinated toDo */}
              <div className={`w-2 ${todo.color} rounded-r-lg`}></div>
            </div>
          ))
        ) : (
          <p className="text center">No more task</p>
        )}
      </div>
    </>
  );
};

export default toDo;
