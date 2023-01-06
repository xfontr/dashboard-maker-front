import { render, screen } from "@testing-library/react";
import schema from "../../../test-utils/mocks/mockFormSchema";
import simplifySchema from "../../../test-utils/simplifySchema";
import { curateErrorMessage, validateForm } from "../Form.utils";
import PathErrors from "./PathErrors";

describe("Given a PathErrors component", () => {
  describe("When instantiated with a list of errors and a input id", () => {
    test("Then it should show all the errors in the list that match the id", () => {
      const values = simplifySchema(schema);
      const errors = validateForm(values);
      const path = schema[0].inputProps.id;

      render(<PathErrors {...{ errors, path }} />);

      errors?.forEach(({ message }) => {
        const shownError = screen.getByText(curateErrorMessage(message));
        expect(shownError).toBeInTheDocument();
      });
    });

    describe("When instantiated with no props", () => {
      test("Then it should display nothing", () => {
        render(<PathErrors path="email" />);

        const notView = screen.queryByTestId("errors");

        expect(notView).not.toBeInTheDocument();
      });
    });

    describe("When instantiated with an empty list of errors", () => {
      test("Then it should display nothing", () => {
        render(<PathErrors path="email" errors={[]} />);

        const notView = screen.queryByTestId("errors");

        expect(notView).not.toBeInTheDocument();
      });
    });
  });
});
