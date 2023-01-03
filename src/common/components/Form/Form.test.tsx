import { render, screen } from "@testing-library/react";
import schema from "../../test-utils/mocks/mockFormSchema";
import Button from "../Button/Button";
import Form from "./Form";
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
  });
});
