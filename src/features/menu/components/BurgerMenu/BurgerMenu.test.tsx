import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../../common/test-utils/customRender";
import BurgerMenu from "./BurgerMenu";

describe("Given a BurgerMenu component", () => {
  describe("When instantiated", () => {
    test("Then it should only show a burger menu icon", () => {
      render(<BurgerMenu />);

      const burgerIcon = screen.getByRole("button", {
        name: "Open burger menu",
      });
      const unexpectedNavigationLinks = screen.queryAllByRole("link");

      expect(burgerIcon).toBeInTheDocument();
      expect(unexpectedNavigationLinks).toHaveLength(0);
    });
  });

  describe("When instantiated and once clicked the burger icon", () => {
    test("Then it should also show the navigation links", async () => {
      render(<BurgerMenu />);

      const burgerIcon = screen.getByRole("button", {
        name: "Open burger menu",
      });
      await userEvent.click(burgerIcon);

      const navigationLinks = screen.getAllByRole("link");

      expect(navigationLinks.length > 0).toBe(true);
    });

    test("Then it should hide all the links if the burger icon is clicked again", async () => {
      render(<BurgerMenu />);

      const burgerIcon = screen.getByRole("button", {
        name: "Open burger menu",
      });

      await userEvent.click(burgerIcon);

      const closeBurgerIcon = screen.getByRole("button", {
        name: "Close burger menu",
      });

      await userEvent.click(closeBurgerIcon);

      const unexpectedNavigationLinks = screen.queryAllByRole("link");

      expect(burgerIcon).toBeInTheDocument();
      expect(unexpectedNavigationLinks).toHaveLength(0);
    });
  });
});
