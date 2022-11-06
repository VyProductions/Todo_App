import React from "react";
import './App.css';

// Importing Components
import Form from "./components/Form"
import TodoList from "./components/TodoList"

// Render The Application's Components
function App() {
  return (
    <div className="App">
      <header>
        <h1>Todo List</h1>
      </header>
      <Form/>
      <TodoList/>
    </div>
  );
}

export default App;
