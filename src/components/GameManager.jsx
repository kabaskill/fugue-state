import { DndContext, DragOverlay, pointerWithin } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import Card from "@/components/Card";
import Deck from "@/components/Deck";
import CardContainer from "@/components/CardContainer";
import DroppableArea from "@/components/DroppableArea";
import { useState, useEffect } from "react";
import SheetMusic from "./SheetMusic";

export default function GameManager() {
  const initialDeck = [
    { name: "Card1", id: "0001", value: "C" },
    { name: "Card2", id: "0002", value: "D" },
    { name: "Card3", id: "0003", value: "E" },
    { name: "Card4", id: "0004", value: "F" },
    { name: "Card5", id: "0005", value: "G" },
    { name: "Card6", id: "0006", value: "A" },
    { name: "Card7", id: "0007", value: "B" },
    { name: "Card8", id: "0008", value: "c" },
    { name: "Card9", id: "0009", value: "d" },
    { name: "Card10", id: "0010", value: "e" },
    { name: "Card11", id: "0011", value: "f" },
    { name: "Card12", id: "0012", value: "g" },
    { name: "Card13", id: "0013", value: "a" },
    { name: "Card14", id: "0014", value: "b" },
  ];

  const [deck, setDeck] = useState(initialDeck);
  const [containerCards, setContainerCards] = useState([]);

  const [noteString, setNoteString] = useState("X:1\nT:Core Gameplay\nK:C\nM:4/4\nL:1/4\nC");

  const [activeId, setActiveId] = useState(null);
  const activeCard = containerCards.find((card) => card.id === activeId);

  useEffect(() => {
    const numberOfCards = 5;
    const initialContainerCards = [];
    const newDeck = [...deck];

    for (let i = 0; i < numberOfCards; i++) {
      const randomIndex = Math.floor(Math.random() * newDeck.length);
      initialContainerCards.push(newDeck.splice(randomIndex, 1)[0]);
    }

    setDeck(newDeck);
    setContainerCards(initialContainerCards);
  }, []);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id === over.id) {
      return;
    }

    if (over && over.id === "droppable-area") {
      const draggedCard = containerCards.find((card) => card.id === active.id);

      if (draggedCard) {
        const draggedCardIndex = containerCards.findIndex((card) => card.id === event.active.id);
        const draggedCard = containerCards[draggedCardIndex];
        const firstCardOnDeck = deck[0];

        setNoteString(noteString + draggedCard.value);

        containerCards.splice(draggedCardIndex, 1);
        deck.splice(0, 1);

        setDeck([...deck, draggedCard]);
        setContainerCards([...containerCards, firstCardOnDeck]);
      }
    } else {
      setContainerCards((cards) => {
        const oldIndex = cards.findIndex((card) => card.id === active.id);
        const newIndex = cards.findIndex((card) => card.id === over.id);
        return arrayMove(cards, oldIndex, newIndex);
      });
    }
  }

  return (
    <>
      <DndContext
        collisionDetection={pointerWithin}
        onDragStart={({ active }) => setActiveId(active.id)}
        onDragEnd={handleDragEnd}
      >
        <div className="w-3/5 bg-slate-200 flex justify-center">
          <SheetMusic id="core-gameplay" notation={noteString} />
        </div>

        <div className="flex items-center justify-center p-4">
          <DroppableArea />

          <SortableContext items={containerCards} strategy={horizontalListSortingStrategy}>
            <CardContainer cards={containerCards} />
          </SortableContext>

          <DragOverlay>
            {activeCard ? <Card card={activeCard} idSuffix="-clone" /> : null}
          </DragOverlay>

          <Deck cards={deck} />
        </div>
      </DndContext>
    </>
  );
}
