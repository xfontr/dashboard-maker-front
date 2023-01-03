import { render, screen } from "@testing-library/react";
import schema from "../../../test-utils/mocks/mockFormSchema";
import Button from "../../Button/Button";
import Form from "../Form";
import userEvent from "@testing-library/user-event";

describe("Given a Form component", () => {
  describe("When instantiated with a form schema and a button 'Submit'", () => {
    test("Then it should render a full editable form", async () => {
      const typedText = "Test";
      const buttonText = "Submit";

      render(
        <Form {...{ schema }}>
          <Button>{buttonText}</Button>
        </Form>
      );

      const form = schema.map(({ label }) => screen.getByLabelText(label));
      const button = screen.getByRole("button", { name: buttonText });

      await userEvent.type(form[0], typedText);

      expect(form[0]).toHaveValue(typedText);
      expect(button).toBeInTheDocument();
    });

    describe("And filled the inputs with valid data", () => {
      test("Then it should submit the form", async () => {
        const typedText = "valid@valid.com";
        const onSubmit = jest.fn();

        const buttonText = "Submit";

        render(
          <Form {...{ schema, onSubmit }}>
            <Button>{buttonText}</Button>
          </Form>
        );

        const form = schema.map(({ label }) => screen.getByLabelText(label));
        const button = screen.getByRole("button", { name: buttonText });

        await userEvent.type(form[0], typedText);
        await userEvent.type(form[1], typedText);

        await userEvent.click(button);

        expect(onSubmit).toHaveBeenCalled();
      });
    });

    describe("And filled the inputs with invalid data", () => {
      test("Then it should not submit the form", async () => {
        const typedText = ".";
        const onSubmit = jest.fn();

        const buttonText = "Submit";

        render(
          <Form {...{ schema, onSubmit }}>
            <Button>{buttonText}</Button>
          </Form>
        );

        const form = schema.map(({ label }) => screen.getByLabelText(label));
        const button = screen.getByRole("button", { name: buttonText });

        await userEvent.type(form[0], typedText);
        await userEvent.type(form[1], typedText);

        await userEvent.click(button);

        expect(onSubmit).not.toHaveBeenCalled();
      });

      test("Then it should display the errors", async () => {
        const typedText = ".";
        const buttonText = "Submit";

        render(
          <Form {...{ schema }}>
            <Button>{buttonText}</Button>
          </Form>
        );

        const form = schema.map(({ label }) => screen.getByLabelText(label));
        const button = screen.getByRole("button", { name: buttonText });

        await userEvent.type(form[0], typedText);

        await userEvent.click(button);

        const errors = screen.getByTestId("errors");
        expect(errors).toBeInTheDocument();
      });
    });
  });
});
