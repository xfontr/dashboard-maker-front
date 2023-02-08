import { render, screen } from "@testing-library/react";
import DashboardLayout from "./DashboardLayout";

describe("Given a DashboardLayout component", () => {
  describe("When instantiated with a child 'Test'", () => {
    test("Then it should render said child and a sideboard", () => {
      const child = "Test";

      render(<DashboardLayout>{child}</DashboardLayout>);

      const view = [screen.getByText(child), screen.getByRole("list")];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });
});
