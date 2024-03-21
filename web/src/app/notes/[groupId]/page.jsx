"use client";
import React, { useState, useEffect, Suspense } from "react";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import Image from "next/image";
import thumbTack from "@/assets/thumbTack.svg";
import NotesLoadingSkeleton from "./NotesLoadingSkeleton";

const getTimeAgo = (dateString) => {
  const date = parseISO(dateString);
  return formatDistanceToNowStrict(date, { addSuffix: true });
};

const NoteBox = ({ note }) => {
  return (
    <div className="relative w-full aspect-square border-[0.5px] border-[#2D2F2D] rounded-lg flex p-4">
      <div className="flex flex-col text-md space-y-2">
        <div className="text-xl font-bold">{note.title}</div>
        <div className="text-[#2D2F2D]">{note.body}</div>
      </div>
      <Image
        className="absolute top=0 right-0 mx-4"
        src={thumbTack}
        width={20}
        height={20}
        alt="Pin note"
      />
      <div className="absolute bottom-0 left-0 text-xs p-4 text-[#2D2F2D] dark:text-[#2D2F2D] rounded-lg">
        <div>Updated {getTimeAgo(note.updatedAt)}</div>
      </div>
      <div
        className={`${note.tag} absolute bottom-0 right-0 text-xs h-5 w-5 m-5 rounded-full`}
      />
    </div>
  );
};

const page = ({ params }) => {
  const colors = "bg-sky-400";

  //! -------------------------------------------------------------------------------------------------------------------
  // ! REMOVE FOR BACKEND DATA
  // const notes = [
  //   {
  //     id: 1,
  //     title:
  //       "First Note First Note First Note First Note First Note First Note First Note First Note",
  //     body: "This is the body of the first note",
  //     createdAt: "2022-01-01T12:00:00",
  //     updatedAt: "2024-01-04T12:00:00",
  //     tag: "bg-sky-400",
  //     pinned: true,
  //   },
  //   {
  //     id: 2,
  //     title: "Second Note",
  //     body: "This is the body of the second note",
  //     createdAt: "2022-01-01T12:00:00",
  //     updatedAt: "2022-01-01T12:00:00",
  //     tag: "bg-indigo-400",
  //     pinned: false,
  //   },
  //   {
  //     id: 3,
  //     title: "Third Note",
  //     body: "This is the body of the third note. Lorem ipsum dolor sit amet consectetur adipisicing elit?",
  //     createdAt: "2022-01-01T12:00:00",
  //     updatedAt: "2022-01-01T12:00:00",
  //     tag: "bg-red-400",
  //     pinned: true,
  //   },
  // ];
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     setLoading(false);
  //   };

  //   fetchData();
  // }, []);
  // const [loading, setLoading] = useState(true);

  // ! -------------------------------------------------------------------------------------------------------------------
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://localhost:8080/api/notes/${id}`);
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.log("Error fetching data:", response.statusText);
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
    <div className="pl-/1/5 p-10 bg-white dark:bg-black min-h-screen">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className={`${colors} w-6 h-6 rounded-full`} />
          <div className="text-2xl font-bold mb-0">{params.groupId}</div>
        </div>
        <div className="text-md">Recently edited</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        <Suspense fallback={<NotesLoadingSkeleton />}>
          {loading
            ? notes.map((note, index) => (
                <div key={note.id}>
                  <NotesLoadingSkeleton
                    title={note.title}
                    body={note.body}
                    date={note.updatedAt}
                    delay={index}
                  />
                </div>
              ))
            : notes.map((note) => <NoteBox key={note.id} note={note} />)}
        </Suspense>
      </div>
    </div>
  );
};

export default page;
