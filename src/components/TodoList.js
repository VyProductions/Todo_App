import React from "react"
import useTodoStore from "../useTodoStore";

// Import Components
import Todo from "./Todo"

const TodoList = () => {
  // Bound State
  const todos = useTodoStore(state => state.todo);
  const filteredTodos = useTodoStore(state => state.filteredTodos);

  return (
  <div className="todo-container" data-testid="todo list container">
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <Todo
          todos={todos}
          key={todo.id}
          todo={todo}
          text={todo.text}
        />
      ))}
    </ul>
  </div>
  );
}

export default TodoList