import { useTheme } from "../Context/ThemeProvider";

const ThemeButton = () => {
  //Using normal way, but would have to do this repeatedly in each component where theme context is needed
  //   const context = useContext(ThemeContext);
  //   if (!context) {
  //     throw new Error("Use it within a ThemeProvider only.");
  //   }
  //   const { theme, toggleTheme } = context;

  //Instead using our custom hook

  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Current Theme: {theme}</button>;
};

export default ThemeButton;
