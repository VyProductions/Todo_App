import React from "react";
import useTodoStore from "../useTodoStore";

const Form = () => {
  // Bound State
  const inputText = useTodoStore(state => state.inputText);
  const setInputText = useTodoStore(state => state.setInputText);
  const addTodo = useTodoStore(state => state.addTodo);
  const setFilter = useTodoStore(state => state.setFilter);
  const setFilteredTodos = useTodoStore(state => state.setFilteredTodos);

  // Event Handlers
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    if (inputText !== "") {
      addTodo({
          text: inputText,
          completed: false,
          id: Math.random() * 1000
      });
      setFilteredTodos();
      setInputText("");
    }
  }

  const statusHandler = (e) => {
    setFilter(e.target.value);
    setFilteredTodos();
  }

  return (
  <form>
    <input
      value={inputText}
      onChange={inputTextHandler}
      type="text"
      className="todo-input"
      placeholder="Enter a task..."
    />
    <button
      onClick={submitTodoHandler}
      className="todo-button"
      type="submit"
      data-testid="form submit button"
    >
      <i className="fas fa-plus-square"></i>
    </button>
    <div className="select" data-testid="select div">
      <select onChange={statusHandler} name="todos" className="filter-todo" data-testid="select element">
        <option className="option-select" value="all">All</option>
        <option className="option-select" value="completed">Completed</option>
        <option className="option-select" value="uncompleted">Uncompleted</option>
      </select>
    </div>
  </form>
  );
}

export default Form;
