import { render, screen, fireEvent, within } from "@testing-library/react";
import { config } from 'react-transition-group'
import "@testing-library/jest-dom";
import App from "../App";
import { useStore } from "zustand";
import useTodoStore from '../useTodoStore'

config.disabled = true;

describe("Header Unit Tests", () => {
  it("Check for correct number of headers [1]", () => {
    render(<App />);
    const headers = screen.getAllByRole("heading");
    expect(headers.length).toBe(1);
  })
  
  it("Check for correct header ['Todo List']", () => {
    render(<App />);
    const headerElement = screen.getByRole("heading", { name: "Todo List" });
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeVisible();
  })
})

const initialStoreState = useTodoStore.getState();

describe("Form Integration Tests", () => {
  beforeEach(() => {
    useTodoStore.setState(initialStoreState, true);
  })

  it("add tasks to the list", () => {
    render(<App/>);

    // locate input field
    const inputElem = screen.getByPlaceholderText("Enter a task...");
    expect(inputElem).toBeInTheDocument();
    expect(inputElem.value).toBe("");

    // locate submit button
    const submitButtonElem = screen.getByTestId("form submit button");
    expect(submitButtonElem).toBeInTheDocument();

    for (var index = 0; index < 5; ++index) {
      // simulate typing tasks
      expect(inputElem.value).toBe("");
      fireEvent.change(inputElem, {target: {value: `Go Get Groceries.${index}`}});
      expect(inputElem.value).toBe(`Go Get Groceries.${index}`);

      // simulate clicking the submit button
      fireEvent.click(submitButtonElem)
      expect(inputElem.value).toBe("");
    }

    // check list of tasks
    const todos = screen.getAllByTestId("todo element");
    expect(todos.length).toBe(5);
  })
})

describe("Todo List Integration Tests", () => {
  beforeEach(() => {
    useTodoStore.setState(initialStoreState, true);
  })

  it("check filtering of todos", ()=>{
    render(<App/>);

    // locate input field
    const inputElem = screen.getByPlaceholderText("Enter a task...");
    expect(inputElem).toBeInTheDocument();
    expect(inputElem.value).toBe("");

    // locate submit button
    const submitButtonElem = screen.getByTestId("form submit button");
    expect(submitButtonElem).toBeInTheDocument();

    for (var index = 0; index < 5; ++index) {
      // simulate typing tasks
      expect(inputElem.value).toBe("");
      fireEvent.change(inputElem, {target: {value: `Go Get Groceries.${index}`}});
      expect(inputElem.value).toBe(`Go Get Groceries.${index}`);

      // simulate clicking the submit button
      fireEvent.click(submitButtonElem)
      expect(inputElem.value).toBe("");
    }

    // check filtering by "completed"
    const filter = screen.getByTestId("select element");
    expect(filter.value).toBe("all");
    fireEvent.change(filter, {target: {value: "completed"}});
    expect(filter.value).toBe("completed");

    const completedTodos = screen.queryAllByTestId("todo element");
    expect(completedTodos.length).toBe(0);

    // check filtering by "uncompleted"
    fireEvent.change(filter, {target: {value: "uncompleted"}});
    expect(filter.value).toBe("uncompleted");

    let uncompletedTodos = screen.getAllByTestId("todo element");
    expect(uncompletedTodos.length).toBe(5);

    // complete all tasks
    for (var index = 0; index < 5; ++index) {
      const task = within(screen.getByText(`Go Get Groceries.${index}`).parentElement);
      fireEvent.click(task.getByRole("button", {name: "complete-btn"}));
    }

    // check that no tasks are left uncompleted
    uncompletedTodos = screen.queryAllByTestId("todo element");
    expect(uncompletedTodos.length).toBe(0);

    // check filtering by "all"
    fireEvent.change(filter, {target: {value: "all"}});
    const unfilteredTodos = screen.getAllByTestId("todo element");
    expect(unfilteredTodos.length).toBe(5);
  })

  it("check the removal of elements from the list", () => {
    render(<App/>);

    // locate input field
    const inputElem = screen.getByPlaceholderText("Enter a task...");
    expect(inputElem).toBeInTheDocument();
    expect(inputElem.value).toBe("");

    // locate submit button
    const submitButtonElem = screen.getByTestId("form submit button");
    expect(submitButtonElem).toBeInTheDocument();

    for (var index = 0; index < 5; ++index) {
      // simulate typing tasks
      expect(inputElem.value).toBe("");
      fireEvent.change(inputElem, {target: {value: `Go Get Groceries.${index}`}});
      expect(inputElem.value).toBe(`Go Get Groceries.${index}`);

      // simulate clicking the submit button
      fireEvent.click(submitButtonElem)
      expect(inputElem.value).toBe("");
    }

    // check filter
    const filter = screen.getByTestId("select element");
    expect(filter.value).toBe("all");

    // check list of tasks
    let taskList = screen.getAllByTestId("todo element");
    expect(taskList.length).toBe(5);

    // delete all tasks
    for (var index = 0; index < 5; ++index) {
      const task = within(screen.getByText(`Go Get Groceries.${index}`).parentElement);
      fireEvent.click(task.getByRole("button", {name: "trash-btn"}));
    }

    // check for tasks being deleted
    taskList = screen.queryAllByTestId("todo element");
    expect(taskList.length).toBe(0);
  })
})