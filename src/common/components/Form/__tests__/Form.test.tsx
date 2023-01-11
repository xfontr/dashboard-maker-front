import { render, screen } from "@testing-library/react";
import schema from "../../../test-utils/mocks/mockFormSchema";
import Button from "../../Button/Button";
import Form from "../Form";
import userEvent from "@testing-library/user-event";
import useForm from "../useForm";

const buttonText = "Button";

const MockForm = ({
  action,
  errorDisplay,
}: {
  action?: Function;
  errorDisplay?: "none" | "individual" | "global";
}): JSX.Element => {
  const formHandler = useForm(schema, action);
  return (
    <Form {...{ errorDisplay, formHandler }}>
      <Button>{buttonText}</Button>
    </Form>
  );
};

describe("Given a Form component", () => {
  describe("When instantiated with a form schema and a button 'Submit'", () => {
    test("Then it should render a full editable form", async () => {
      const typedText = "test@test.com";

      render(<MockForm />);

      const form = screen.getByLabelText(schema[0].label);
      const button = screen.getByRole("button", { name: buttonText });

      await userEvent.type(form, typedText);

      expect(form).toHaveValue(typedText);
      expect(button).toBeInTheDocument();
    });

    describe("And filled the inputs with valid data", () => {
      test("Then it should submit the form", async () => {
        const typedText = "valid@valid.com";
        const action = jest.fn();

        render(<MockForm {...{ action }} />);

        const form = schema.map(({ label }) => screen.getByLabelText(label));
        const button = screen.getByRole("button", { name: buttonText });

        await userEvent.type(form[0], typedText);
        await userEvent.type(form[1], typedText);

        await userEvent.click(button);

        expect(action).toHaveBeenCalled();
      });
    });

    describe("And filled the inputs with invalid data", () => {
      test("Then it should not submit the form", async () => {
        const typedText = ".";
        const action = jest.fn();

        render(<MockForm {...{ action }} />);

        const form = schema.map(({ label }) => screen.getByLabelText(label));
        const button = screen.getByRole("button", { name: buttonText });

        await userEvent.type(form[0], typedText);
        await userEvent.type(form[1], typedText);

        await userEvent.click(button);

        expect(action).not.toHaveBeenCalled();
      });

      test("Then it should display a list of errors", async () => {
        const typedText = ".";

        const errorDisplay = "global";

        render(<MockForm {...{ errorDisplay }} />);

        const form = schema.map(({ label }) => screen.getByLabelText(label));
        const button = screen.getByRole("button", { name: buttonText });

        await userEvent.type(form[0], typedText);

        await userEvent.click(button);

        const errors = screen.getByTestId("errors");
        expect(errors).toBeInTheDocument();
      });

      test("Then it should display errors for each field, if set as 'individual'", async () => {
        const typedText = ".";

        const errorDisplay = "individual";

        render(<MockForm {...{ errorDisplay }} />);

        const form = schema.map(({ label }) => screen.getByLabelText(label));
        const button = screen.getByRole("button", { name: buttonText });

        await userEvent.type(form[0], typedText);

        await userEvent.click(button);

        const errors = screen.getAllByTestId("errors");
        expect(errors.length).toBe(1);
      });

      test("Then each field with error should change its style", async () => {
        const typedText = ".";
        const errorDisplay = "individual";

        render(<MockForm {...{ errorDisplay }} />);

        const form = schema.map(({ label }) => screen.getByLabelText(label));
        const button = screen.getByRole("button", { name: buttonText });

        await userEvent.type(form[0], typedText);

        const label = screen.getByText(schema[0].label);

        await userEvent.click(button);
        expect(label).toHaveStyle("color: colors.$error");
      });
    });
  });
});
