import React from "react"

const Todo = ( { setTodos, todos, todo, text } ) => {
  // Events
  const completeHandler = () => {
    setTodos(todos.map(item => {
      if (item.id === todo.id) {
        return {
          ...item, completed: !item.completed
        }
      }
      return item;
    }))
  }
  const deleteHandler = () => {
    setTodos(todos.map(item => {
      if (item.id === todo.id) {
        return {
          ...item, deleting: true
        }
      }
      return item;
    }))
    console.log("Delete btn pressed.");
  };
  const animationEndHandler = ({ animationName }) => {
    if (animationName === "fall-anim") {
      setTodos(todos.filter(el => el.id !== todo.id));
    }
  }

  return (
    <div onAnimationEnd={(event) => animationEndHandler(event)} className ={`todo ${todo.deleting ? "fall" : ""}`}>
      <li className={`todo-item ${todo.completed ? "completed" : ""}`}>{text}</li>
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

export default Todo