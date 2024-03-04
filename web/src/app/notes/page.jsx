"use client";
import React, { useState } from "react";

const App = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="flex h-screen bg-white dark:bg-black  text-white p-4">
      <aside className="w-1/5 p-5 bg-white dark:bg-black border-r border-gray-500">
        <div className="my-4">
          <h1 className="text-2xl font-bold  text-[#767676] mb-4">Notes</h1>
          <div className="cursor-pointer text-sm text-[#767676]">
            + Add Document
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold  text-[#767676] mb-4">Classroom</h1>
          <div className="cursor-pointer text-sm text-[#767676]">
            + Add Room
          </div>
        </div>
      </aside>
      <main className="w-4/5 p-5 bg-white dark:bg-black">
        <NotesArea selectedTopic={selectedTopic} />
      </main>
    </div>
  );
};

const NotesArea = ({ selectedTopic }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Selected Topic: {selectedTopic || "None"}
      </h1>
      {/* Render your notes content here based on the selected topic */}
    </div>
  );
};

export default App;
