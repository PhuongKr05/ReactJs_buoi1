import { useContext } from "react";
import { ThemeProvider, ThemeContext } from "./component/theme";
import Box from "./component/box";

function AppContent() {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Chuyển Giao Diện Sáng/Tối</h1>
      <button onClick={toggleTheme}>Đổi Theme</button>
      <Box />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
