import { useEffect, useState } from "react";
import TodoListItem from "./components/todo-list-item";
import AddTodo from "./components/add-todo";
import { ToDoElement } from "./types/todo-element.interface";
import { TodoContext } from "./contexts/todo.context";

const LOCAL_STORAGE_KEY = "TODO_ELEMENTS";

function App() {
  const localStorageItems = () => {
    try {
      const string = localStorage.getItem(LOCAL_STORAGE_KEY);
      return JSON.parse(string ?? "[]") as ToDoElement[];
    } catch (e) {
      return [];
    }
  };

  const [todoElements, setTodoElements] =
    useState<ToDoElement[]>(localStorageItems);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoElements));
  }, [todoElements]);
  return (
    <div className={"flex justify-center items-center flex-col grow h-[100vh]"}>
      <TodoContext.Provider value={{ todoElements, setTodoElements }}>
        <div className={"w-80"}>
          <AddTodo />
          <div className={"h-40 overflow-x-auto"}>
            {todoElements.map((todo) => (
              <TodoListItem todo={todo} key={todo.id} />
            ))}
          </div>
        </div>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
