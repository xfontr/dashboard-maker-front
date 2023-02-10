import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLocation } from "react-router-dom";
import { CloseIcon } from "../../../../common/components/Icon/Icon";
import { render } from "../../../../common/test-utils/customRender";
import MenuItem from "./MenuItem";

const MockComponent = () => {
  const { pathname } = useLocation();

  return (
    <>
      path: {pathname}
      <MenuItem label="Test" to="home" />
    </>
  );
};

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

      const hiddenView = screen.queryByRole("link");
      expect(hiddenView).not.toBeInTheDocument();
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

  describe("When instantiated with a label and a 'to' option", () => {
    test("Then it should also render a link that on click redirects to the 'to' path", async () => {
      render(<MockComponent />);

      const currentPage = screen.getByText("path: /");
      const link = screen.getByRole("link", { name: "Test" });

      expect(currentPage).toBeInTheDocument();
      expect(link).toBeInTheDocument();

      await userEvent.click(link);

      const updatedPage = screen.getByText("path: /home");
      expect(updatedPage).toBeInTheDocument();
    });
  });
});
