import Notes from "./notes";
import Groups from "./groups";

const Sidebar = () => {
  return (
    <div className="w-1/5 p-5 pl-0 bg-white dark:bg-black border-r border-gray-500 h-screen flex flex-col">
      <div className="flex flex-col h-1/2">
        <Notes />
      </div>
      <div className="flex flex-col h-1/2">
        <Groups />
      </div>
    </div>
  );
};

export default Sidebar;
