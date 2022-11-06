import React from "react"
import useTodoStore from "../useTodoStore";

const Todo = ({ todo, text }) => {
  // ------
  // Bound State Functions
  const removeTodo = useTodoStore(state => state.removeTodo);
  const toggleTodoCompleted = useTodoStore(state => state.toggleTodoCompleted);
  const setFilteredTodos = useTodoStore(state => state.setFilteredTodos);

  // Event Handlers
  const completeHandler = () => {
    toggleTodoCompleted(todo.id);
    setFilteredTodos();
  }

  const deleteHandler = () => {
    removeTodo(todo.id);
    setFilteredTodos();
  };

  return (
    <div className="todo" data-testid="todo element">
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
        {text}
      </li>
      <button onClick={completeHandler} className="complete-btn" aria-label="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn" aria-label="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

export default Todo