import React from "react";

const Form = ({ todos, setTodos, inputText, setInputText, setStatus }) => {
  // Write JS code and functions
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };
  const submitTodoHandler = (e) => {
    e.preventDefault();
    setTodos([
      ...todos, {text: inputText, completed: false, id: Math.random() * 1000}
    ]);
    setInputText("");
  }
  const statusHandler = (e) => {
    setStatus(e.target.value);
  }
  return (
  <form>
    <input value={inputText} onChange={inputTextHandler} type="text" className="todo-input" />
    <button onClick={submitTodoHandler} className="todo-button" type="submit">
      <i className="fas fa-plus-square"></i>
    </button>
    <div className="select">
      <select onChange={statusHandler} name="todos" className="filter-todo">
        <option className="option-select" value="all">All</option>
        <option className="option-select" value="completed">Completed</option>
        <option className="option-select" value="uncompleted">Uncompleted</option>
      </select>
    </div>
  </form>
  );
}

export default Form;
