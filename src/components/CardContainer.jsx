import Card from "./Card";

const CardContainer = ({ cards }) => {
  return (
    <ul className="fixed bottom-0 w-full h-1/5 flex justify-center p-4 gap-2 bg-gray-700">
      {cards.map((card) => (
        <Card key={card.id} id={card.id} value={card.value}>
          {card.name}: {card.value}
        </Card>
      ))}
    </ul>
  );
};

export default CardContainer;
