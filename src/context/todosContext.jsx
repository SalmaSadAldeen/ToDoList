import { createContext, useReducer } from "react";
import todosReducer from "../context/todosReducer"; 
export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
