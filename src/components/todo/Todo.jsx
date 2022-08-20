import React from "react";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import "./todo.css";
import TodoForm from "../todoForm/TodoForm";

const Todo = ({
  todo,
  deleteTodo,
  completeTodo,
  toggleEditMode,
  editTodo,
  editTodoId,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="todo-container">
      <input
        className="check"
        type="checkbox"
        checked={todo.isComplete}
        onChange={() => completeTodo(todo.id)}
      />
      {todo.id === editTodoId ? (
        <TodoForm
          id="todo-edit"
          type="text btnText="
          update
          value={editTodo}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      ) : (
        <div className="todo-text-btn">
          <p className={`todo-text ${todo.isComplete ? "completed" : ""}`}>
            {todo.todoText}
          </p>
          <div className="todo-btn">
            <button className="btn-group" onClick={() => deleteTodo(todo.id)}>
              <RiDeleteBin6Line className="iconD" />
            </button>
            <button
              className="btn-group"
              onClick={() => toggleEditMode(todo.id)}
            >
              <RiEditBoxLine className="iconU" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Todo;
