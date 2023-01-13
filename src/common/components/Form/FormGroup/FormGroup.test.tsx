import { render, screen } from "@testing-library/react";
import schema from "../../../test-utils/mocks/mockFormSchema";
import { InputProps } from "../Form.types";
import FormGroup from "./FormGroup";
import userEvent from "@testing-library/user-event";

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

    test("Then it should display said input field as a textarea if specified as such", () => {
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

    test("Then it should display said input field as a Select with a list if specified as such", async () => {
      const label = schema[0].label;
      const inputProps: InputProps = {
        ...schema[0].inputProps,
        renderas: "select",
        subprops: ["Test 1", "Test 2"],
      };
      const fieldProps = schema[0].fieldProps;

      render(<FormGroup {...{ label, inputProps }} {...fieldProps} />);

      const input = screen.getByLabelText(label);

      expect(input).toBeInTheDocument();
      expect(input).toContainHTML("select");

      const option1 = screen.getByText(inputProps.subprops![0]);
      const option2 = screen.getByText(inputProps.subprops![1]);

      expect(option1).toBeInTheDocument();
      expect(option2).toBeInTheDocument();
    });

    test("Then it should display said input field as a Select with no list elements if specified as such", async () => {
      const label = schema[0].label;
      const inputProps: InputProps = {
        ...schema[0].inputProps,
        renderas: "select",
      };
      const fieldProps = schema[0].fieldProps;

      render(<FormGroup {...{ label, inputProps }} {...fieldProps} />);

      const options = screen.queryAllByRole("option");

      expect(options.length).toBe(0);
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
