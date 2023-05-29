import { useContext, useState } from "react";
import { TodoContext } from "../../contexts/todo.context";

const AddTodo = () => {
  const { setTodoElements } = useContext(TodoContext);
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
  return (
    <div className={"flex w-full"}>
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
  );
};

export default AddTodo;
