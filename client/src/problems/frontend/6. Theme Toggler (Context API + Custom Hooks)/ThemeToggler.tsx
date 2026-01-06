import "./ThemeToggler.css";
import { ThemeProvider } from "./Context/ThemeProvider";
import ThemeButton from "./Components/ThemeButton";

const ThemeToggler = () => {
  return (
    <ThemeProvider>
      <div>
        <h1>Theme Toggler using Context API and Custom Hooks</h1>
        <ThemeButton />
      </div>
    </ThemeProvider>
  );
};

export const meta = {
  title: "Theme Toggler with Context API and Custom Hooks",
  category: "frontend" as const,
};

export default ThemeToggler;
