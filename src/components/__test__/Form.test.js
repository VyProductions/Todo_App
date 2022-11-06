import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "../Form";

describe("Form Unit Tests", () => {
    it("check for input element", () => {
        render(<Form/>);
        const inputElement = screen.getByPlaceholderText(/enter a task.../i);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toBeVisible();
    })

    it("verify that input text displays in input element", () => {
        render(<Form/>);

        const inputElement = screen.getByPlaceholderText(/enter a task.../i);
        fireEvent.change(inputElement, {target: {value: "Go Get Groceries."}});
        expect(inputElement.value).toBe("Go Get Groceries.");
    })

    it("check for submit button element", () => {
        render(<Form/>);
        const submitButton = screen.getByRole("button");
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toBeVisible();
    })

    it("check for select element", () => {
        render(<Form/>);

        const selectElement = screen.getByTestId("select div");
        expect(selectElement).toBeInTheDocument();
        expect(selectElement).toBeVisible();

        // Check select options
        const selectOptions = screen.getAllByRole("option");
        expect(selectOptions.length).toBe(3);
        expect(selectOptions[0]).toBeInTheDocument();
        expect(selectOptions[0].value).toBe("all");
        expect(selectOptions[1]).toBeInTheDocument();
        expect(selectOptions[1].value).toBe("completed");
        expect(selectOptions[2]).toBeInTheDocument();
        expect(selectOptions[2].value).toBe("uncompleted");
    })
})