import { formatDistanceToNowStrict, parseISO } from "date-fns";
import Image from "next/image";
import thumbTack from "@/assets/thumbTack.svg";

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

// Fetch the static paths for the group pages
export async function getStaticPaths(){
  const groups = await fetch("https://localhost:8000/groups").then((res) => res.json());

  const paths = groups.map((group) => ({
    params: { groupId: group.id.toString() }, // Ensure the id is a string
  }));

  return { paths, fallback: "blocking" };
};

// Fetch the notes for each static group page
export async function getStaticProps({ params }) {
  const notes = await fetch(`https://localhost:8000/groups/${params.groupId}/notes`).then((res) => res.json());

  return {
    props: {
      notes,
      groupId: params.groupId
    },
    revalidate: 60, // Fetched every 60 seconds
  };
}

// The page component that renders the group notes
const GroupNotesPage = ({ notes, groupId }) => {
  // const notes = [
  //   {
  //     id: 1,
  //     title: "First Note",
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
  //     body: "This is the body of the third note",
  //     createdAt: "2022-01-01T12:00:00",
  //     updatedAt: "2022-01-01T12:00:00",
  //     tag: "bg-red-400",
  //     pinned: true,
  //   },
  // ];
  return (
    <div className="pl-1/5 p-10 bg-white dark:bg-black min-h-screen">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          {/* The color of the circle might correspond to something about the group */}
          <div className={`${groupId.color} w-6 h-6 rounded-full`} />
          <div className="text-2xl font-bold mb-0">Group {groupId}</div>
        </div>
        <div className="text-md">Recently edited</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
        {notes.map((note) => (
          <NoteBox key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default GroupNotesPage;
