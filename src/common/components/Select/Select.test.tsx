import { render, screen } from "@testing-library/react";
import Select from "./Select";

describe("Given a Select component", () => {
  describe("When instantiated with a list of options and a specific style", () => {
    test("Then it should render each option and the select node itself, as well as the style", () => {
      const options = ["Test 1", "Test 2"];
      const className = "select--bigger";

      const expectedClass = "select select--bigger";

      render(<Select {...{ options, className }} />);

      const select = screen.getByRole<HTMLSelectElement>("combobox");
      const renderedOptions = screen.getAllByRole("option");

      expect(select).toBeInTheDocument();
      expect(select).toHaveClass(expectedClass);
      expect(select.value).toBe(options[0]);
      expect(renderedOptions).toHaveLength(2);
    });
  });
});
