export const getStaticPaths = async () => {
  // Fetch the list of personal note IDs from your API
  const notes = await fetch(`https://localhost:8000/personal/notes`).then((res) => res.json());
  // Generate the paths for static generation
  const paths = notes.map((note) => ({
    params: { noteId: note.id.toString() },
  }));

  return { paths, fallback: 'blocking' };
};

// This function is called for each page at build time
export const getStaticProps = async ({ params }) => {
  const noteId = params.noteId;
  const note = await fetch(`https://localhost:8000/personal/notes/${noteId}`).then((res) => res.json());

  return { 
    props: { 
      note 
    } 
  };
};

const NotePage = ({ note }) => {
  return (
    <div>
      <h1>Hi: {note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
};

export default NotePage;
