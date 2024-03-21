import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SheetMusic from "./SheetMusic";
import Image from "next/image";

const Card = ({ card, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  const cardNote = "L:1/4\n" + card.value;
  const noteId = "card-note" + card.id + card.value;

  return (
    <button
      ref={setNodeRef}
      style={{
        transform: isDragging ? CSS.Translate.toString(transform) : "none",
        transition,
      }}
      {...attributes}
      {...listeners}
      className="relative p-2 cursor-pointer h-[280px] w-[200px] bg-slate-500 flex flex-col items-center gap-8"
    >
      {/* <Image
        src="/placeholders/old-paper.png"
        alt="note-image"
        className="absolute -z-10 top-0 left-0 w-full h-full"
        width={512}
        height={512}
      /> */}
      <div className=" w-3/4 h-1/3 ">
        <SheetMusic id={noteId} notation={cardNote} />
      </div>
      {children}
      <p>Adds a quarter note</p>
    </button>
  );
};

export default Card;
