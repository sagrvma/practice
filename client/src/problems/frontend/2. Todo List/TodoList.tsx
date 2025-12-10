import { useState } from "react";
import "./TodoList.css";

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
    <div className="todo-list">
      <input
        className="todo-list-input"
        type="text"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo(inputText);
          }
        }}
      />
      <button
        className="todo-list-button"
        type="button"
        onClick={() => {
          addTodo(inputText);
        }}
      >
        +
      </button>
      {todoList.length === 0 ? (
        <p className="todo-list-message">No todos yet.</p>
      ) : (
        <ul className="todo-list-list">
          {todoList.map((item) => (
            <li key={item.id} className="todo-list-item">
              <input className="todo-list-item-checkbox" type="checkbox" />
              <span className="todo-list-item-text">{item.text}</span>
              <button
                className="todo-list-delete-btn"
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
    </div>
  );
};

export const meta = {
  title: "Todo List",
  category: "frontend" as const,
};

export default TodoList;
