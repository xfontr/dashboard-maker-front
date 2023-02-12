import { screen } from "@testing-library/react";
import { render } from "../../../../common/test-utils/customRender";
import DashboardLayout from "./DashboardLayout";

describe("Given a DashboardLayout component", () => {
  describe("When instantiated with a child 'Test'", () => {
    test("Then it should render said child, a menu and breadcrumbs", () => {
      const child = "Test";

      render(<DashboardLayout>{child}</DashboardLayout>);

      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1500,
      });

      const view = [
        screen.getByText(child),
        screen.getByRole("navigation"),
        screen.getByTestId("breadcrumbs"),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });

  describe("When instantiated with a heading and a subheading", () => {
    test("Then it should render them both", () => {
      const heading = "heading";
      const subheading = "subheading";

      render(
        <DashboardLayout {...{ heading, subheading }}>Test</DashboardLayout>
      );

      const view = [
        screen.getByRole("heading", { name: heading }),
        screen.getByText(subheading),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });
});
