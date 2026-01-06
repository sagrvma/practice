import { createContext, useContext, useState, type ReactNode } from "react";

//Defining the shape of the context data
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

//Create the context, default as undefined to detect when the hook is used outside the context
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

//Defining prop types for the ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  //Conditional styles for the theme based on current theme
  const appStyles: React.CSSProperties = {
    color: theme === "light" ? "#000000" : "#ffffff",
    backgroundColor: theme === "light" ? "#ffffff" : "#000000",
    minHeight: "100vh",
    transition: "all 0.3 ease",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={appStyles}>{children}</div>
    </ThemeContext.Provider>
  );
};

//Instead of using useContext(ThemeContext) in every component, making a custom hook. Abstracts the context usage and enforces the rule that hook must be used inside a theme provider only
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider.");
  }

  return context;
};
