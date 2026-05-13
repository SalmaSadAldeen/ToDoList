import { createContext, useReducer } from "react";
import todosReducer from "../context/todosReducer"; // تأكدي من مسار الملف

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  // هنا العقل المدبر: المصفوفة والأوامر
  const [todos, dispatch] = useReducer(todosReducer, []);

  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};
