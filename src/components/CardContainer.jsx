import Card from "./Card";

const CardContainer = ({ cards }) => {
  return (
    <ul className="fixed bottom-0 w-full h-1/5 flex justify-center p-4 gap-2 bg-gray-700">
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </ul>
  );
};

export default CardContainer;
