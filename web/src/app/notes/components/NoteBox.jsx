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
  