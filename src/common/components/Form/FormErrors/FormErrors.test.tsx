import { render, screen } from "@testing-library/react";
import mockFormSchema from "../../../test-utils/mocks/mockFormSchema";
import { validateForm } from "../Form.utils";
import FormErrors from "./FormErrors";

describe("Given a FormErrors component", () => {
  describe("When instantiated with a list of errors", () => {
    test("Then it should display every error", () => {
      const { error } = validateForm({
        [mockFormSchema[0].inputProps.id]: "",
      });

      render(<FormErrors errors={error?.details} />);

      error?.details.forEach(({ message }) => {
        const error = screen.getByText(message);
        expect(error).toBeInTheDocument();
      });
    });

    describe("When instantiated with no props", () => {
      test("Then it should display nothing", () => {
        render(<FormErrors />);

        const notView = screen.queryByTestId("errors");

        expect(notView).not.toBeInTheDocument();
      });
    });

    describe("When instantiated with an empty list of errors", () => {
      test("Then it should display nothing", () => {
        render(<FormErrors errors={[]} />);

        const notView = screen.queryByTestId("errors");

        expect(notView).not.toBeInTheDocument();
      });
    });
  });
});
