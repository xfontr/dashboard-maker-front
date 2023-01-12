import { render, screen } from "@testing-library/react";
import schema from "../../../test-utils/mocks/mockFormSchema";
import { InputProps } from "../Form.types";
import FormGroup from "./FormGroup";

describe("Given a FormGroup component", () => {
  describe("When called with a label and input and field props", () => {
    test("Then it should display said label and both input and field with the passed props", () => {
      const label = schema[0].label;
      const inputProps = schema[0].inputProps;
      const fieldProps = schema[0].fieldProps;

      render(<FormGroup {...{ label, inputProps }} {...fieldProps} />);

      const input = screen.getByLabelText(label);
      const inputField = screen.getByTestId("form__group");

      expect(input).toBeInTheDocument();
      expect(inputField).toHaveClass(schema[0].fieldProps!.className!);
    });

    test("Then it should display said input field as a textare if specified as such", () => {
      const label = schema[0].label;
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

    test("Then it should display no tooltips", () => {
      const label = schema[0].label;
      const inputProps = schema[0].inputProps;
      const fieldProps = schema[0].fieldProps;

      render(<FormGroup {...{ label, inputProps }} {...fieldProps} />);

      const tooltip = screen.queryByTestId("tooltip");

      expect(tooltip).not.toBeInTheDocument();
    });

    describe("When called with a label, an input, field props and a tooltip", () => {
      test("Then it should display said field tooltip", () => {
        const label = schema[0].label;
        const inputProps = schema[0].inputProps;
        const fieldProps = schema[0].fieldProps;
        const tooltip = "Test tooltip";

        render(
          <FormGroup {...{ label, inputProps, tooltip }} {...fieldProps} />
        );

        const viewTooltip = screen.getByText(tooltip);

        expect(viewTooltip).toBeInTheDocument();
      });
    });
  });
});
