import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import Portal from "./Portal";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (element: ReactNode, node: HTMLElement) => element,
}));

describe("Given a Portal component", () => {
  describe("When instantiated with 'Hello' as children", () => {
    test("Then it should display the children", () => {
      const children = "Hello";
      render(<Portal>{children}</Portal>);

      const view = screen.getByText(children);

      expect(view).toBeInTheDocument();
    });
  });
});
