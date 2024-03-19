"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


const groups = () => {
  const router = useRouter();
  const [groups, setGroups] = useState([
    { id: "1", title: "Group One", date: "01/01/24", tag: "bg-red-400" },
  ]);
  // fetch should set the Notes into a list of map of notes with nodeID, title, date

  const handleAddGroupClick = () => {
    //TODO: Backend call to create a Group note
    //Should add the new Group ID, title, to the DB and returns all the info to the frontend
    const generatedGroupID = 1; // **** Pace Holder for the note id to know redirect ****
    if (generatedGroupID) {
      router.push(`/notes/${generatedGroupID}`);
    } else {
      console.log("Failed to create note");
    }
  };

  const handleGroupClick = (groupId) => {
    router.push(`/notes/${groupId}`);
  }

  return (
    <>
      <h1 className="text-3xl font-light text-[#767676] my-2 cursor-default">
        Groups       
        </h1>
      <div className="flex-1 flex flex-col">
        <div className="overflow-y-auto max-h-[calc(50vh-120px)] space-y-2">
          {groups.length > 0 ? (
            groups.map((groups) => (
              <div
                key={groups.id}
                className="flex justify-start items-center space-x-2 cursor-pointer bg-[#F3F2F2] dark:bg-[#1E1E1E] rounded-lg px-3 py-4"
                onClick={() => handleGroupClick(groups.id)}
              >
                <div className={`${groups.tag} w-4 h-4 rounded-full`} />
                <div className="text-md mb-0">{groups.title}</div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">😱 OMG!! No Groups</div>
          )}
        </div>
        <div className="m-3" onClick={handleAddGroupClick}>
          <div className="cursor-pointer text-sm text-[#767676] mt-auto">
            + Add Group
          </div>
        </div>
      </div>
    </>
  );
};

export default groups;
