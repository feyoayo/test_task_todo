import classNames from "classnames";
import { useState } from "react";
import { ToDoElement } from "../../App";
import { useTodoManipulations } from "../../hooks";
import { ShowElement } from "../ui";

interface TodoListItemProps {
  todo: ToDoElement;
}
const TodoListItem = ({ todo }: TodoListItemProps) => {
  const { completeTodoHandler, removeTodoHandler, updateTodoTitle } =
    useTodoManipulations();
  const [editTodo, setEditTodo] = useState(false);
  const [inputValue, setInputValue] = useState(todo.title);
  const saveEditTodoHandler = () => {
    setEditTodo(false);
    updateTodoTitle(todo.id, inputValue);
  };

  return (
    <div className={"flex justify-between w-80"}>
      <ShowElement when={!editTodo}>
        <div className={"flex gap-3"}>
          <input
            checked={todo.isCompleted}
            onChange={() => completeTodoHandler(todo.id)}
            type="checkbox"
          />
          <div>
            <span className={classNames(todo.isCompleted && "line-through")}>
              {todo.title}
            </span>
          </div>
        </div>
      </ShowElement>
      <ShowElement when={editTodo}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </ShowElement>

      <div>
        <ShowElement when={!editTodo && !todo.isCompleted}>
          <button
            onClick={() => setEditTodo(true)}
            className={"bg-slate-400 w-16 "}
          >
            Edit
          </button>
        </ShowElement>

        <ShowElement when={editTodo}>
          <button
            onClick={saveEditTodoHandler}
            className={"bg-slate-400 w-16 "}
          >
            Save
          </button>
        </ShowElement>

        <button
          onClick={() => removeTodoHandler(todo.id)}
          className={"bg-red-400 w-16 "}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoListItem;
