import NoteBox from "../components/NoteBox";

const PersonalNotesPage = () => {
  // const [notes, setNotes] = useState([]);
  const colors = "bg-sky-400"; // **** Pace Holder ****

  useEffect(() => {
    async function fetchNotes() {
      const response = await fetch(`https://.../personal/notes`);
      const data = await response.json();
      setNotes(data);
    }
    
    fetchNotes();
  }, []); 

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
          <div className="text-2xl font-bold mb-0">Notes</div>
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
