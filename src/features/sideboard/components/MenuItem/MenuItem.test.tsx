import { render, screen } from "@testing-library/react";
import { CloseIcon } from "../../../../common/components/Icon/Icon";
import MenuItem from "./MenuItem";

describe("Given a MenuItem component", () => {
  describe("When instantiated with a label, an icon and a class 'Test'", () => {
    test("Then it should show a list item with said icon and label", () => {
      const className = "Test";
      const label = "Test";
      const Icon = CloseIcon;

      render(<MenuItem {...{ className, label, Icon }} />);

      const view = [
        screen.getByRole("listitem"),
        screen.getByText(label),
        screen.getByTestId("icon"),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());

      expect(view[0]).toHaveClass(`menu-item ${className}`);
    });
  });

  describe("When instantiated with a label and an icon but setting it to show only icon", () => {
    test("Then it should show a list item with said icon and no label", () => {
      const label = "Test";
      const Icon = CloseIcon;
      const showOnlyIcon = true;

      render(<MenuItem {...{ label, Icon, showOnlyIcon }} />);

      const view = [screen.getByRole("listitem"), screen.getByTestId("icon")];

      view.forEach((node) => expect(node).toBeInTheDocument());

      const hiddenView = screen.queryByText(label);

      expect(hiddenView).not.toBeInTheDocument();
    });
  });

  describe("When instantiated with a label and no icon", () => {
    test("Then it should show a list item with said label and no icon", () => {
      const label = "Test";

      render(<MenuItem {...{ label }} />);

      const view = [screen.getByRole("listitem"), screen.getByText(label)];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });

  describe("When instantiated with a label, no icon but setting it to show only icon", () => {
    test("Then it should show a list item with said icon and no label", () => {
      const label = "Test";
      const showOnlyIcon = true;

      render(<MenuItem {...{ label, showOnlyIcon }} />);

      const view = screen.getByRole("listitem");

      expect(view).toBeInTheDocument();

      const hiddenView = [
        screen.queryByText(label),
        screen.queryByTestId("icon"),
      ];

      hiddenView.forEach((node) => expect(node).not.toBeInTheDocument());
    });
  });
});
