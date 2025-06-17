import { useContext } from "react";
import { ThemeContext } from "./theme";
import "./box.css";

const Box = () => {
  const { theme } = useContext(ThemeContext);

  return <div className={`box ${theme}`}>Theme: {theme}</div>;
};

export default Box;
