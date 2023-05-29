import { useMemo } from "react";
import TodoListItem from "./components/todo-list-item";
import AddTodo from "./components/add-todo";
import { ToDoElement } from "./types/todo-element.interface";
import { TodoContext } from "./contexts/todo.context";
import { useLocalStorage } from "./hooks";
import { ShowElement } from "./components/ui";
import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_SELECT_KEY,
} from "./config/constants";
import { FilterValueContext } from "./contexts/filter-value.context";
import { SelectValues } from "./enum/filter-values.enum";
import Filter from "./components/filter";

function App() {
  const [todoElements, setTodoElements] = useLocalStorage<ToDoElement[]>(
    LOCAL_STORAGE_KEY,
    []
  );

  const [filterValue, setFilterValue] = useLocalStorage<
    keyof typeof SelectValues
  >(LOCAL_STORAGE_SELECT_KEY, "all");

  const filteredElements: ToDoElement[] = useMemo(() => {
    if (filterValue === SelectValues.completed) {
      return todoElements.filter((el) => el.isCompleted);
    }
    if (filterValue === SelectValues.uncompleted) {
      return todoElements.filter((el) => !el.isCompleted);
    }

    return todoElements;
  }, [filterValue, todoElements]);

  return (
    <div className={"flex justify-center items-center flex-col grow h-[100vh]"}>
      <TodoContext.Provider
        value={{ todoElements: filteredElements, setTodoElements }}
      >
        <div className={"w-80"}>
          <FilterValueContext.Provider
            value={{ filterValue, changeValue: setFilterValue }}
          >
            <Filter />
            <AddTodo />
          </FilterValueContext.Provider>
          <div className={"h-40 overflow-x-auto mt-3"}>
            <ShowElement when={!filteredElements.length}>
              <span>Nothing to show yet...</span>
            </ShowElement>
            {filteredElements?.map((todo) => (
              <TodoListItem todo={todo} key={todo.id} />
            ))}
          </div>
        </div>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
