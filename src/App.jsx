import "./App.css";
import TodoList from "./components/TodoList";
import { useReducer } from "react"; // استبدلنا useState بـ useReducer
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { TodosContext } from "./context/todosContext";
import todosReducer from "./context/todosReducer"; // استيراد الـ Reducer اللي كتبناه

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
  // 1. استخدام useReducer بدلاً من useState
  // القيمة المبدئية هي مصفوفة فارغة لأن الـ Reducer سيجلب البيانات من الـ LocalStorage لاحقاً
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
        {/* 2. نمرر الـ dispatch بدلاً من الـ setTodos */}
        <TodosContext.Provider value={{ todos, dispatch }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
