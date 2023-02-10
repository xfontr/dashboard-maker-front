import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../common/test-utils/customRender";
import Sideboard from "./Sideboard";

describe("Given a Sideboard component", () => {
  const labels = ["Overview", "Log out", "Contract/Expand"];

  describe("When instantiated", () => {
    test("Then it should show two menus with items", () => {
      /** Regular menu + user card menu */
      const menus = 2;
      const totalMenuItems = menus * 2;

      render(<Sideboard />);

      const menu = screen.getAllByRole("list");
      const menuItems = screen.getAllByRole("listitem");

      expect(menu).toHaveLength(menus);
      expect(menuItems).toHaveLength(totalMenuItems);
    });

    describe("And clicked the button to contract the menu", () => {
      test("Then it should display only the item icons and user profile picture and contract the sideboard", async () => {
        render(<Sideboard />);

        const contractButton = screen.getByRole("listitem", {
          name: "Contract menu",
        });

        // Verifies that the sideboard has the full options

        labels.forEach((label) => {
          expect(screen.getByText(label)).toBeInTheDocument();
        });

        const userOptions = 2;

        const fullUserData = screen.getAllByRole("button");
        expect(fullUserData).toHaveLength(userOptions);

        // Contracts the sideboard
        await userEvent.click(contractButton);

        labels.forEach((label) => {
          expect(screen.queryByText(label)).not.toBeInTheDocument();
        });

        // Verifies that the sideboard has the contracted options

        const userProfilePicture = screen.getByAltText("User profile");
        expect(userProfilePicture).toBeInTheDocument();

        const remainingUserData = screen.queryAllByRole("button");
        expect(remainingUserData).toHaveLength(0);

        const sideboard = screen.getByTestId("sideboard");

        expect(sideboard).toHaveClass("sideboard--contracted");
      });
    });

    describe("And clicked the button to expand the menu", () => {
      test("Then it should display the full menu items and complete user profile and resize the sideboard", async () => {
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
