import { useState } from "react";

import "./Counter.css";

const Counter = () => {
  const [history, setHistory] = useState<number[]>([0]);

  console.log(history);

  const increment = () => {
    setHistory((prev) => [...prev, prev[prev.length - 1] + 1]);
  };

  const decrement = () => {
    setHistory((prev) => [...prev, prev[prev.length - 1] - 1]);
  };

  const undo = () => {
    if (history.length === 1) {
      return;
    }
    const newHistory = [...history];
    newHistory.pop();
    setHistory(newHistory);
  };

  const reset = () => {
    setHistory([0]);
  };

  return (
    <div className="wrapper">
      <h1>Counter App with Undo</h1>
      <div className="counterWrapper">
        <h1 className="number">
          {history.length === 0 ? 0 : history[history.length - 1]}
        </h1>
        <div className="buttonWrapper">
          <div className="buttonTopRow">
            <button className="incrementBtn" onClick={decrement}>
              -1
            </button>
            <button
              className="undoBtn"
              onClick={undo}
              disabled={history.length <= 1}
            >
              Undo
            </button>
            <button className="incrementBtn" onClick={increment}>
              +1
            </button>
          </div>
          <button className="resetBtn" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export const meta = {
  title: "Counter App with Undo",
  category: "frontend" as const,
};

export default Counter;
