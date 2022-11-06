import create from "zustand"
import { devtools, persist } from "zustand/middleware"

// Zustand state management object
const todoStore = (set) => ({
    todos: [],
    filteredTodos: [],
    inputText: "",
    filter: "all",
    addTodo: (todo) => {  // Add a todo element to the todos list
        set((state) => ({
            todos: [...state.todos, todo],
        }))
    },
    removeTodo: (todoID) => {  // Remove a todo element from the list by id
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== todoID),
        }))
    },
    toggleTodoCompleted: (todoID) => {  // Toggle 'completed' state of a todo
        set((state) => ({
            todos: state.todos.map((todo) => todo.id === todoID ?
                {...todo, completed: !todo.completed} : todo)
        }))
    },
    setFilteredTodos: () => {  // Filter displayed todos based on filter value
        set((state) => ({
            filteredTodos:
                state.filter === "completed" ?
                state.todos.filter(todo => todo.completed === true) :
                state.filter === "uncompleted" ?
                state.todos.filter(todo => todo.completed === false) :
                // filter == "all"
                state.todos
        }))
    },
    setFilter: (filt) => {  // Change the filter string value
        set(() => ({
            filter: filt
        }))
    },
    setInputText: (text) => {  // Set the input text value of the form
        set(() => ({
            inputText: text
        }))
    }
})

// Create store
const useTodoStore = create(
    devtools(  // Cause data to be stored in local-storage
        persist(todoStore, {name: "todo-store"})
    )
);

export default useTodoStore