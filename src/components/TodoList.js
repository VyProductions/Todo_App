import React from "react"
import useTodoStore from "../useTodoStore";

// Import Components
import Todo from "./Todo"

// Render The Todo List Component
const TodoList = () => {
  // ------
  // Bound State Functions
  const filteredTodos = useTodoStore(state => state.filteredTodos);

  return (
  <div className="todo-container" data-testid="todo list container">
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <Todo key={todo.id} todo={todo} text={todo.text}/>
      ))}
    </ul>
  </div>
  );
}

export default TodoList