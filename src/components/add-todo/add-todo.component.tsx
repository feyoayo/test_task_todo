import { useContext, useState } from "react";
import { FilterValueContext } from "../../contexts/filter-value.context";
import { TodoContext } from "../../contexts/todo.context";

const AddTodo = () => {
  const { setTodoElements } = useContext(TodoContext);
  const { filterValue, changeValue } = useContext(FilterValueContext);
  const [value, setValue] = useState<string>("");
  const addTodoHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodoElements((prev) =>
      prev.concat({
        id: Math.floor(Math.random() * 100000),
        isCompleted: false,
        title: value,
      })
    );
    if (filterValue === "completed") {
      changeValue("all");
    }
    setValue("");
  };
  return (
    // <div className={"flex w-full"}>
    <form className={"flex w-full"} onSubmit={(e) => addTodoHandler(e)}>
      <input
        className={
          "outline-none flex grow border-slate-500 border-dashed border"
        }
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className={
          "bg-slate-500 w-16 disabled:bg-slate-100 disabled:cursor-not-allowed "
        }
        type="submit"
        disabled={!value}
      >
        Add
      </button>
    </form>
    // </div>
  );
};

export default AddTodo;
