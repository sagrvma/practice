import { useState } from "react";
import "./Accordion.css";

const accordionItems = [
  {
    id: 1,
    title: "What is React?",
    content:
      "React is a JavaScript library for building user interfaces, created by Facebook.",
  },
  {
    id: 2,
    title: "How does useState work?",
    content:
      "useState is a Hook that lets you add state to functional components. It returns a state variable and a setter function.",
  },
  {
    id: 3,
    title: "What are Hooks?",
    content:
      "Hooks are functions that let you use state and other React features in functional components.",
  },
];

const Accordion = () => {
  const [openItemId, setOpenItemId] = useState<number | null>(1);

  const handleClick = (itemId: number) => {
    if (itemId === openItemId) {
      setOpenItemId(null);
      return;
    }

    setOpenItemId(itemId);
  };

  return (
    <div className="accordion-wrapper">
      <ul className="accordion">
        {accordionItems.map((item) => (
          <li key={item.id} className="accordion-item">
            <h2
              className="accordion-item-title"
              onClick={() => {
                handleClick(item.id);
              }}
            >
              {item.title} ↓
            </h2>
            {item.id === openItemId && (
              <p className="accordion-item-content">{item.content}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const meta = {
  title: "Accordion",
  category: "frontend" as const,
};

export default Accordion;
