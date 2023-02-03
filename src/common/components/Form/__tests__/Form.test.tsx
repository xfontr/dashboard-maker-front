import { render, screen } from "@testing-library/react";
import Button from "../../Button/Button";
import Form from "../Form";
import userEvent from "@testing-library/user-event";
import useForm from "../../../hooks/useForm";
import { INPUT_RULES } from "../Form.constants";
import { mockFormSchema as schema } from "../../../test-utils/mocks";

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
    test("Then it should render a full editable form with its tooltips, if any", async () => {
      const typedText = "test@test.com";

      render(<MockForm />);

      const form = screen.getByLabelText(schema[0].label);
      const button = screen.getByRole("button", { name: buttonText });

      await userEvent.type(form, typedText);

      expect(form).toHaveValue(typedText);
      expect(button).toBeInTheDocument();

      const tooltip = screen.getByText(schema[1].tooltip!);
      expect(tooltip).toBeInTheDocument();
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

    describe("And trying to fill a text input with numbers", () => {
      test("Then it should not type the number", async () => {
        const typedText = "aaa2a";
        const expectedTypedText = "aaaa";

        render(<MockForm />);

        const form = screen.getByLabelText(schema[0].label);

        await userEvent.type(form, typedText);

        expect(form).toHaveValue(expectedTypedText);
      });
    });

    describe("And trying to type more characters than allowed in a text field", () => {
      test("Then it should not type any extra characters", async () => {
        const typedText = Array(INPUT_RULES.email.max + 1)
          .fill("a")
          .join("");
        const expectedTypedText = Array(INPUT_RULES.email.max)
          .fill("a")
          .join("");

        render(<MockForm />);

        const form = screen.getByLabelText(schema[0].label);

        await userEvent.type(form, typedText);

        expect(form).toHaveValue(expectedTypedText);
      });
    });

    describe("And trying to type more characters than allowed in a number field", () => {
      test("Then it should not type any extra characters", async () => {
        const typedText = Array(schema[2].inputProps.maxLength! + 1)
          .fill("1")
          .join("");
        const expectedTypedText = Array(schema[2].inputProps.maxLength!)
          .fill(1)
          .join("");

        render(<MockForm />);

        const form = screen.getByLabelText<HTMLInputElement>(schema[2].label);

        await userEvent.type(form, typedText);

        expect(form.value).toBe(expectedTypedText);
      });
    });
  });
});
