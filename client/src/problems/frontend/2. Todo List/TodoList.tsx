import { useState } from "react";

type todo = {
  id: number;
  text: string;
};

const TodoList = () => {
  const [todoList, setTodoList] = useState<Array<todo>>([
    { id: 1, text: "be god" },
  ]);
  const [inputText, setInputText] = useState<string>("");

  const addTodo = (todoItem: string) => {
    if (todoItem) {
      const id: number = Date.now(); //Better choice for random than Math.random()
      const text: string = todoItem;

      const todoObj = {
        id,
        text,
      };

      setTodoList((prev) => [...prev, todoObj]);

      setInputText("");
    }
  };

  const removeTodo = (itemId: number) => {
    setTodoList((prev) => prev.filter((todoItem) => todoItem.id !== itemId));
  };

  return (
    <>
      <input
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          addTodo(inputText);
        }}
      >
        +
      </button>
      {todoList.length === 0 ? (
        <p>No todos yet.</p>
      ) : (
        <ul>
          {todoList.map((item) => (
            <li key={item.id}>
              <input type="checkbox" />
              {item.text}
              <button
                type="button"
                onClick={() => {
                  removeTodo(item.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export const meta = {
  title: "Todo List",
  category: "frontend" as const,
};

export default TodoList;
