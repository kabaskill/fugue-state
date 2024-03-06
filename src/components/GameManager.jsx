"use client";
import { DndContext } from "@dnd-kit/core";
import Deck from "@/components/Deck";
import CardContainer from "@/components/CardContainer";
import DroppableArea from "@/components/DroppableArea";
import { useState, useEffect } from "react";
import SheetMusic from "./SheetMusic";

function GameManager() {
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
    if (event.over && event.over.id === "droppable-area") {
      const draggedCardIndex = containerCards.findIndex((card) => card.id === event.active.id);
      const draggedCard = containerCards[draggedCardIndex];
      const firstCardOnDeck = deck[0];

      setNoteString(noteString + draggedCard.value);

      containerCards.splice(draggedCardIndex, 1);
      deck.splice(0, 1);
      setDeck([...deck, draggedCard]);
      setContainerCards([...containerCards, firstCardOnDeck]);
    }
  }

  return (
    <>
      <div  className="w-[1000px]  bg-slate-200 flex justify-center">
        <SheetMusic id="core-gameplay" notation={noteString} />
      </div>

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex items-center justify-center p-4">
          <DroppableArea />

          <CardContainer cards={containerCards} />

          <Deck cards={deck} />
        </div>
      </DndContext>
    </>
  );
}

export default GameManager;
