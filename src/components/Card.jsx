import { useDraggable } from "@dnd-kit/core";
import SheetMusic from "./SheetMusic";
import Image from "next/image";

const Card = ({ id, value, children }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  const cardNote = "L:1/4\n" + value;
  const noteId = "card-note" + id + value;

  return (
    <button
      ref={setNodeRef}
      style={{
        transform: isDragging ? `translate(${transform.x}px, ${transform.y}px)` : "none",
      }}
      {...attributes}
      {...listeners}
      className="relative p-2 cursor-pointer h-[280px] w-[200px] flex flex-col items-center gap-8"
    >
      <Image
        src="/placeholders/old-paper.png"
        alt="note-image"
        className="absolute -z-10 top-0 left-0 w-full h-full"
        width={512}
        height={512}
      />
      <div className=" w-3/4 h-1/3 ">
        <SheetMusic id={noteId} notation={cardNote} />
      </div>
      {children}
      <p>Adds a quarter note</p>
    </button>
  );
};

export default Card;
