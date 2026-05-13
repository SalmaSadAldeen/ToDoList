import "./App.css";
import TodoList from "./components/TodoList";
import { useReducer } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodosContext } from "./context/todosContext";
import todosReducer from "./context/todosReducer";

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  palette: {
    primary: {
      main: "#3f3766",
    },
  },
});

function App() {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          minWidth: "100vw",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          margin: 0,
        }}
      >
        <TodosContext.Provider value={{ todos, dispatch }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
