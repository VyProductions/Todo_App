import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Todo from "../Todo";

const mockedSetTodo = jest.fn();
const mockedSetStatus = jest.fn();

describe("Todo Unit Tests", () => {
    it("check for todo element", () => {
        render(<Todo
            setTodos={mockedSetTodo}
            todos={[]}
            key={{}}
            todo={{}}
            text={"Go Get Groceries."}
            filteredTodos={[]}
        />);
        const todos = screen.getAllByTestId("todo element");
        expect(todos.length).toBe(1);
        expect(todos[0]).toBeInTheDocument();
        expect(todos[0]).toBeVisible();
        
        const todo = screen.getByText("Go Get Groceries.");
        expect(todo).toBeInTheDocument();
        expect(todo).toBeVisible();

        const todo_null = screen.queryByText("Do Laundry.");
        expect(todo_null).not.toBeInTheDocument();
    })
})