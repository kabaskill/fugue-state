import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SheetMusic from "./SheetMusic";

const Card = ({ card }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    zIndex: isDragging ? 1000 : undefined
  };

  const cardNote = "L:1/4\n" + card.value;
  const noteId = "card-note" + card.id + card.value;

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative p-2 cursor-pointer h-[250px] w-[200px] bg-card-bg bg-contain flex flex-col items-center justify-center "
    >
      <div className=" w-3/4 h-1/3 ">
        <SheetMusic id={noteId} notation={cardNote} />
      </div>
      <p className="text-2xl">{card.value}</p>

      <p>Adds a quarter note</p>
    </button>
  );
};

export default Card;
