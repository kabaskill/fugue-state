import { useState } from "react";
import { closestCenter, DndContext } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const data =  [
    {
      "id": 1,
      "name": "Samaria",
      "lastName": "Sennett"
    },
    {
      "id": 2,
      "name": "Gauthier",
      "lastName": "Fassbindler"
    },
    {
      "id": 3,
      "name": "Mellisa",
      "lastName": "Armatidge"
    },
    {
      "id": 4,
      "name": "Arabela",
      "lastName": "Chardin"
    },
    {
      "id": 5,
      "name": "Devon",
      "lastName": "McCorrie"
    },
];

const SortableUser = ({ user }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: user.id });
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="user">
      {user.name}
    </div>
  );
};

const Test = () => {
  const [users, setUsers] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const addUser = () => {
    newUser = {
      id: Date.now().toString(),
      name: inputValue,
    };
    setInputValue("");
    setUsers((users) => [...users, newUser]);
  };

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id === over.id) {
      return;
    }
    setUsers((users) => {
      const oldIndex = users.findIndex((user) => user.id === active.id);
      const newIndex = users.findIndex((user) => user.id === over.id);
      return arrayMove(users, oldIndex, newIndex);
    });
  };

  return (
    <div className="users">
      <div>Total: {users.length}</div>
      <div className="users-form">
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={addUser}>Add user</button>
      </div>
      <div>
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={users} strategy={verticalListSortingStrategy}>
            {users.map((user) => (
              <SortableUser key={user.id} user={user} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};
export default Test;