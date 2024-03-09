
const Sidebar = () => {
  return (
    <div className="w-1/5 p-5 bg-white dark:bg-black border-r border-gray-500 h-screen">
      <div className="">
        <h1 className="text-2xl font-bold  text-[#767676] mb-4">Notes</h1>
        <div className="cursor-pointer text-sm text-[#767676]">
          + Add Document
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold  text-[#767676] mb-4">Classroom</h1>
        <div className="cursor-pointer text-sm text-[#767676]">+ Add Room</div>
      </div>
    </div>
  );
};

export default Sidebar;