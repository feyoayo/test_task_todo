import { useContext } from "react";
import { TodoContext } from "../contexts/todo.context";
import { ToDoElement } from "../types/todo-element.interface";

function useTodoManipulations() {
  const { setTodoElements, todoElements } = useContext(TodoContext);

  const removeTodoHandler = (id: number) => {
    setTodoElements((prev: ToDoElement[]) => prev.filter((el) => el.id !== id));
  };
  const completeTodoHandler = (id: number) => {
    const copiedElements = structuredClone(todoElements) as ToDoElement[];
    copiedElements.map((el) => {
      if (el.id === id) {
        el.isCompleted = !el.isCompleted;
      }
      return el;
    });
    setTodoElements(copiedElements);
  };

  const updateTodoTitle = (id: number, title: string) => {
    const copiedElements = structuredClone(todoElements) as ToDoElement[];
    copiedElements.map((el) => {
      if (el.id === id) {
        el.title = title;
      }
      return el;
    });
    setTodoElements(copiedElements);
  };

  return {
    completeTodoHandler,
    removeTodoHandler,
    updateTodoTitle,
  };
}
export default useTodoManipulations;
