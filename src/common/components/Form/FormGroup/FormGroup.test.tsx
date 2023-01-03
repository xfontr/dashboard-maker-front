import { render, screen } from "@testing-library/react";
import schema from "../../../test-utils/mocks/mockFormSchema";
import { InputProps } from "../Form.types";
import FormGroup from "./FormGroup";

describe("Given a FormGroup component", () => {
  describe("When called with a label 'Test' and input and field props", () => {
    test("Then it should display said label and both input and field with the passed props", () => {
      const label = "Test";
      const inputProps = schema[0].inputProps;
      const fieldProps = schema[0].fieldProps;

      render(<FormGroup {...{ label, inputProps }} {...fieldProps} />);

      const input = screen.getByLabelText(label);
      const inputField = screen.getByTestId("form__group");

      expect(input).toBeInTheDocument();
      expect(inputField).toHaveClass(schema[0].fieldProps.className!);
    });

    test("Then it should display said input field as a textare if specified as such", () => {
      const label = "Test";
      const inputProps: InputProps = {
        ...schema[0].inputProps,
        renderas: "textarea",
      };
      const fieldProps = schema[0].fieldProps;

      render(<FormGroup {...{ label, inputProps }} {...fieldProps} />);

      const input = screen.getByLabelText(label);

      expect(input).toBeInTheDocument();
      expect(input).toContainHTML("textarea");
    });
  });
});
