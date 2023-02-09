import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../common/test-utils/customRender";
import Sideboard from "./Sideboard";

describe("Given a Sideboard component", () => {
  const labels = ["Overview", "Log out", "Contract/Expand"];

  describe("When instantiated", () => {
    test("Then it should show a menu with items", () => {
      const totalMenuItems = 2;

      render(<Sideboard />);

      const menu = screen.getByRole("list");
      const menuItems = screen.getAllByRole("listitem");

      expect(menu).toBeInTheDocument();
      expect(menuItems).toHaveLength(totalMenuItems);
    });

    describe("And clicked the button to contract the menu", () => {
      test("Then it should display only the item icons and resize the sideboard", async () => {
        render(<Sideboard />);

        const contractButton = screen.getByRole("listitem", {
          name: "Contract menu",
        });

        labels.forEach((label) => {
          expect(screen.getByText(label)).toBeInTheDocument();
        });

        // Contracts the sideboard
        await userEvent.click(contractButton);

        labels.forEach((label) => {
          expect(screen.queryByText(label)).not.toBeInTheDocument();
        });

        const sideboard = screen.getByTestId("sideboard");

        expect(sideboard).toHaveClass("sideboard--contracted");
      });
    });

    describe("And clicked the button to expand the menu", () => {
      test("Then it should display only the item icons and resize the sideboard", async () => {
        render(<Sideboard />);

        const contractButton = screen.getByRole("listitem", {
          name: "Contract menu",
        });

        // Contracts the sideboard
        await userEvent.click(contractButton);

        // Expands the sideboard
        await userEvent.click(contractButton);

        labels.forEach((label) => {
          expect(screen.getByText(label)).toBeInTheDocument();
        });

        const sideboard = screen.getByTestId("sideboard");

        expect(sideboard).toHaveClass("sideboard");
        expect(sideboard).not.toHaveClass("sideboard--contracted");
      });
    });
  });
});
