import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../TodoList";

const mockedSetTodo = jest.fn();

describe("TodoList Unit Tests", () => {
    it("check for todo list container", () => {
        render(<TodoList
            todos={[]}
            setTodos={mockedSetTodo}
            filteredTodos={[]}
        />);

        const listContainerElem = screen.getByTestId("todo list container");
        expect(listContainerElem).toBeInTheDocument();
        expect(listContainerElem).toBeVisible();
    })

    it("check for todo list element", () => {
        render(<TodoList
            todos={[]}
            setTodos={mockedSetTodo}
            filteredTodos={[]}
        />);

        const listElem = screen.getByRole("list");
        expect(listElem).toBeInTheDocument();
        expect(listElem).toBeVisible();
    })
})