import { render, screen } from "@testing-library/react";
import Box, { GlassBox } from "./Box";

describe("Given a Box component", () => {
  describe("When instantiated with a child 'Test' and class name 'implementation-details'", () => {
    test("Then it should render said child with the specified class", () => {
      const children = "Test";
      const className = "implementation-details";

      render(<Box {...{ className }}>{children}</Box>);

      const view = screen.getByText(children);

      expect(view).toBeInTheDocument();
      expect(view).toHaveClass("box implementation-details");
    });
  });
});

describe("Given a GlassBox component", () => {
  describe("When instantiated with a child 'Test' and class name 'implementation-details'", () => {
    test("Then it should render said child with the specified class", () => {
      const children = "Test";
      const className = "implementation-details";

      render(<GlassBox {...{ className }}>{children}</GlassBox>);

      const view = screen.getByText(children);

      expect(view).toBeInTheDocument();
      expect(view).toHaveClass("box box--glass implementation-details");
    });
  });
});
