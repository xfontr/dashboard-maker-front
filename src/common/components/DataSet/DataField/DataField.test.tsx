import { render, screen } from "@testing-library/react";
import DataField from "./DataField";

describe("Given a DataField component", () => {
  describe("When instantiated with a heading 'Test' and 'Test data' as data", () => {
    test("Then it should render both texts", () => {
      const heading = "Test";
      const data = "Test data";

      render(<DataField {...{ heading, data }} />);

      const view = [screen.getByText(heading), screen.getByText(data)];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });

  describe("When instantiated with a heading 'Test' and no test data", () => {
    test("Then it should render a '-' instead of the data", () => {
      const dataReplacement = "-";
      const heading = "Test";

      render(<DataField {...{ heading }} />);

      const view = screen.getByText(dataReplacement);

      expect(view).toBeInTheDocument();
    });
  });
});
