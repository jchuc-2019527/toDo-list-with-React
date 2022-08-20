import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { v4 as uuidv4 } from "uuid";
import "./general.css";
import TodoForm from "../todoForm/TodoForm";
import TodoList from "../todoList/TodoList";
import NavBar from "../navbar/NavBar";

function General() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  

  const { user } = useAuth();


  // Obtener datos del localStorage
  useEffect(() => {
    const todoJSON = localStorage.getItem("todos","user");
    const getTodosLocal = JSON.parse(todoJSON);

    //console.log(found);

    if(getTodosLocal.length > 0) {
      setTodos(getTodosLocal);
    }
  }, []);


 // Guardar datos en el localStorage
  useEffect(() => {
    const todoJSON = JSON.stringify(todos, user.email);
    const userJSON = JSON.stringify(user.email);
    localStorage.setItem("todos", todoJSON);
    localStorage.setItem("user", userJSON);
  }, [todos]);

  
  const handleInputChange = (e) => {
    if (e.target.id === "todo-add-input") {
      setTodo(e.target.value);
    } else {
      setEditTodo(e.target.value);
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (e.target.id === "todo-add-form") {
      const newTodo = {
        id: uuidv4(),
        todoText: todo,
        isComplete: false,
        user: user.email,
        
      };
      setTodos([...todos, newTodo]);
      setTodo("");
    } else {
      const updateTodos = [...todos].map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, todoText: editTodo };
        } else {
          return todo;
        }
      });
      setTodos(updateTodos);
      setEditTodoId(null);
      setEditTodo("");
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(updatedTodos);
  };

  const completeTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          isComplete: !todo.isComplete,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleEditMode = (id) => {
    const todo = [...todos].find((todo) => {
      return todo.id === id;
    });
    setEditTodoId(id);
    setEditTodo(todo.todoText);
  };

  return (
    <div className="app-container1">
      <NavBar />
      <TodoForm
        id="todo-add"
        type="text"
        btnText="Add"
        value={todo}
        onChange={handleInputChange}
        onSubmit={handleInputSubmit}
      />
      <TodoList
        todos={todos}
        editTodo={editTodo}
        editTodoId={editTodoId}
        deleteTodo={deleteTodo}
        completeTodo={completeTodo}
        toggleEditMode={toggleEditMode}
        onChange={handleInputChange}
        onSubmit={handleInputSubmit}
      />
    </div>
  );
}

export default General;
