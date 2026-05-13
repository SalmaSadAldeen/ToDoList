export default function todosReducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: action.payload.id,
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "deleted": {
      const updatedTodos = currentTodos.filter(
        (t) => t.id !== action.payload.id,
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "updated": {
      const updatedTodos = currentTodos.map((t) =>
        t.id === action.payload.id ? action.payload : t,
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "get": {
      const storageData = JSON.parse(localStorage.getItem("todos") ?? "[]");
      return storageData;
    }

    case "toggledCompleted": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return { ...t, isCompleted: !t.isCompleted };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default: {
      throw Error("Unknown Action " + action.type);
    }
  }
}
