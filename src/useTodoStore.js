import create from "zustand"
import { devtools, persist } from "zustand/middleware"

// Zustand state management

const todoStore = (set) => ({
    todos: [],
    filteredTodos: [],
    inputText: "",
    filter: "all",
    addTodo: (todo) => {
        set((state) => ({
            todos: [...state.todos, todo],
        }))
    },
    removeTodo: (todoID) => {
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== todoID),
        }))
    },
    toggleTodoCompletion: (todoID) => {
        set((state) => ({
            todos: state.todos.map((todo) => todo.id === todoID ? {...todo, completed: !todo.completed} : todo)
        }))
    },
    setFilteredTodos: () => {
        set((state) => ({
            filteredTodos: state.filter === "completed" ?
                state.todos.filter(todo => todo.completed === true) :
                state.filter === "uncompleted" ?
                state.todos.filter(todo => todo.completed === false) :
                state.todos
        }))
    },
    setFilter: (filt) => {
        set(() => ({
            filter: filt
        }))
    },
    setInputText: (text) => {
        set(() => ({
            inputText: text
        }))
    }
})

const useTodoStore = create(
    devtools(
        persist(todoStore, {name: "todo-store"})
    )
);

export default useTodoStore