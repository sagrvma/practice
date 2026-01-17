import { useEffect, useRef, useState } from "react";
import "./Dropdown.css";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setSelected(`Option ${option}`);
    setIsOpen(false);
  };

  const options: Array<string> = ["A", "B", "C", "D"];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!isOpen) {
        return;
      }

      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [isOpen]);

  return (
    <div className="wrapper">
      <h1>Dropdown</h1>
      <div className="panelWrapper" ref={dropDownRef}>
        <button className="btn" onClick={handleClick}>
          {selected ?? "Select an Option"}
        </button>
        {isOpen && (
          <ul className="panel">
            {options.map((option) => (
              <li
                className="panelOption"
                onClick={() => handleOptionClick(option.toString())}
              >
                Option {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export const meta = {
  title: "Click Outside to Close Dropdown",
  category: "frontend" as const,
};

export default Dropdown;
