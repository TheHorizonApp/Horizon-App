import { formatDistanceToNowStrict, parseISO } from "date-fns";
import Image from "next/image";
import thumbTack from "@/assets/thumbTack.svg";

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

  const notes = [
    {
      id: 1,
      title: "First Note",
      body: "This is the body of the first note",
      createdAt: "2022-01-01T12:00:00",
      updatedAt: "2024-01-04T12:00:00",
      tag: "bg-sky-400",
      pinned: true,
    },
    {
      id: 2,
      title: "Second Note",
      body: "This is the body of the second note",
      createdAt: "2022-01-01T12:00:00",
      updatedAt: "2022-01-01T12:00:00",
      tag: "bg-indigo-400",
      pinned: false,
    },
    {
      id: 3,
      title: "Third Note",
      body: "This is the body of the third note",
      createdAt: "2022-01-01T12:00:00",
      updatedAt: "2022-01-01T12:00:00",
      tag: "bg-red-400",
      pinned: true,
    },
  ];

  return (
    <div className="pl-/1/5 p-10 bg-white dark:bg-black min-h-screen">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <div className={`${colors} w-6 h-6 rounded-full`} />
          <div className="text-2xl font-bold mb-0">{params.groupId}</div>
        </div>
        <div className="text-md">Recently edited</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {notes.map((note) => (
          <NoteBox key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default page;
