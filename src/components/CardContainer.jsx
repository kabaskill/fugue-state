import Card from "./Card";

const CardContainer = ({ cards }) => {
  return (
    <ul className="fixed bottom-0 w-full h-[200px] flex justify-center p-4 gap-2 bg-gray-700">
      {cards.map((card) => (
        <li key={card.id}>
          <Card id={card.id} value={card.value}>
            {card.name}: {card.value}
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default CardContainer;