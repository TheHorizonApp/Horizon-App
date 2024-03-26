// export const getStaticPaths = async () => {
//   const groups = await fetch("https://localhost:8000/groups").then((res) =>
//     res.json()
//   );

//   // Create an array of promises for notes requests
//   const notesPromises = groups.map((group) =>
//     fetch(`http://localhost:8000/groups/${group.id}/notes`).then((res) =>
//       res.json()
//     )
//   );
//   const notesArray = await Promise.all(notesPromises);

//   // Create paths for each note in each group
//   const paths = notesArray.flatMap((notes, index) =>
//     notes.map((note) => ({
//       params: { groupId: groups[index].id, noteId: note.id },
//     }))
//   );

//   return { paths, fallback: "blocking" };
// };

// export const getStaticProps = async ({ params }) => {
//   const note = await fetch(
//     `http://localhost:8000/groups/${params.groupId}/notes/${params.noteId}`
//   ).then((res) => res.json());

//   return {
//     props: {
//       note,
//     },
//   };
// };

const NotePage = ({ param }) => {
  return (
    <div>
      <h1>Hi: {param.noteId}</h1>
      <p>{param.content}</p>
      {/* Add the rest of the note details here */}
    </div>
  );
};

export default NotePage;
