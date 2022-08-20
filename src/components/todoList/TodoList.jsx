import React from "react";
import Todo from "../todo/Todo";
import "./todoList.css";
import { useAuth } from "../../context/AuthContext";



const TodoList = ({
  todos,
  deleteTodo,
  completeTodo,
  toggleEditMode,
  editTodo,
  editTodoId,
  onChange,
  onSubmit,
}) => {
  const { user } = useAuth();
  console.log(user);
  const renderTodos = () => {
    if (todos.length > 0) {
      return todos.map((todo) => {
        if(todo.user === user.email) {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            completeTodo={completeTodo}
            toggleEditMode={toggleEditMode}
            editTodo={editTodo}
            editTodoId={editTodoId}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        )}
      });
    }
  };
  return <div className="todoList-container">{renderTodos()} </div>;
};

export default TodoList;
