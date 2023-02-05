import { render, screen } from "@testing-library/react";
import Box from "./Box";

describe("Given a Box component", () => {
  describe("When instantiated with a child 'Test'", () => {
    test("Then it should render said child", () => {
      const children = "Test";

      render(<Box>{children}</Box>);

      const view = screen.getByText(children);

      expect(view).toBeInTheDocument();
    });
  });
});
