"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const notes = () => {
  const router = useRouter();

  //TODO: Fetch the notes from the backend set
  const [notes, setNotes] = useState([
    { id: "1", title: "Note One", date: "01/01/24", tag: "bg-red-400" },
    { id: "2", title: "Note Two", date: "02/02/24", tag: "bg-sky-400" },
    { id: "1", title: "Note One", date: "01/01/24", tag: "bg-red-400" },
  ]);
  const handleAddDocumentClick = () => {
    //TODO: Backend call to create a new note
    //Should add the new note ID, title, date to the DB and returns all the info to the frontend
    const generatedNoteId = 1; // **** Pace Holder for the note id to know redirect ****
    if (generatedNoteId) {
      router.push(`/notes/personal/${generatedNoteId}`);
    } else {
      console.log("Failed to create note");
    }
  };

  const handleNoteClick = (noteId) => {
    router.push(`/notes/personal/${noteId}`);
  }


  return (
    <>
      <h1 className="text-3xl font-light text-[#767676] my-2 cursor-default">Notes</h1>
      <div className="flex-1 flex flex-col m-3">
        <div className="overflow-y-auto max-h-[calc(50vh-120px)] space-y-4">
          {notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="flex justify-start items-center space-x-2 cursor-pointer"
                onClick={() => handleNoteClick(note.id)}
              >
                <div className={`${note.tag} w-4 h-4 rounded-full`} />
                <div className="flex flex-col">
                  <div className="text-md mb-0">{note.title}</div>
                  <div className="text-xs mt-0 text-[#525252]">{note.date}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">😱 OMG!! No Notes</div>
          )}
        </div>
        <div className="m-3 mt-4" onClick={handleAddDocumentClick}>
          <div className="cursor-pointer text-sm text-[#767676] mt-auto">
            + Add Document
          </div>
        </div>
      </div>
    </>
  );
};

export default notes;
