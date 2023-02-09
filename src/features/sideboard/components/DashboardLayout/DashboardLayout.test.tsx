import { screen } from "@testing-library/react";
import { render } from "../../../../common/test-utils/customRender";
import DashboardLayout from "./DashboardLayout";

describe("Given a DashboardLayout component", () => {
  describe("When instantiated with a child 'Test'", () => {
    test("Then it should render said child and a sideboard", () => {
      const child = "Test";

      render(<DashboardLayout>{child}</DashboardLayout>);

      const view = [screen.getByText(child), ...screen.getAllByRole("list")];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });
});
