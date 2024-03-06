import { useDraggable } from "@dnd-kit/core";
import SheetMusic from "./SheetMusic";

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
      className="bg-gray-300 p-2 cursor-pointer h-[280px] w-[200px] flex flex-col items-center gap-8"
    >
      <div className=" w-3/4 h-1/3 bg-white">
        <SheetMusic id={noteId} notation={cardNote} />
      </div>
      {children}
      <p>Adds a quarter {value} note</p>
    </button>
  );
};

export default Card;
