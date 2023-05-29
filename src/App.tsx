import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import classNames from "classnames";
import { useTodoManipulations } from "./hooks";
import TodoListItem from "./components/todo-list-item";
export const TodoContext = createContext<{
  todoElements: any[];
  setTodoElements: any;
}>({
  todoElements: [],
  setTodoElements: () => {},
});

export interface ToDoElement {
  id: number;
  title: string;
  isCompleted: boolean;
}

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

  const [value, setValue] = useState<string>("");
  const addTodoHandler = () => {
    setTodoElements((prev) =>
      prev.concat({
        id: Math.floor(Math.random() * 100000),
        isCompleted: false,
        title: value,
      })
    );
    setValue("");
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todoElements));
  }, [todoElements]);
  return (
    <div className={"flex justify-center items-center flex-col grow h-[100vh]"}>
      <TodoContext.Provider value={{ todoElements, setTodoElements }}>
        <div className={"flex w-80"}>
          <input
            className={
              "outline-none flex grow border-slate-500 border-dashed border"
            }
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className={"bg-slate-500 w-16 "}
            onClick={addTodoHandler}
            disabled={!value}
          >
            Add
          </button>
        </div>

        <div className={"h-40 overflow-x-auto"}>
          {todoElements.map((todo) => (
            <TodoListItem todo={todo} key={todo.id} />
          ))}
        </div>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
