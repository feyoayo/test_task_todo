import { createContext } from "react";
import { ToDoElement } from "../types/todo-element.interface";

export const TodoContext = createContext<{
  todoElements: ToDoElement[];
  setTodoElements: React.Dispatch<React.SetStateAction<ToDoElement[]>>;
}>({
  todoElements: [],
  setTodoElements: () => {},
});
