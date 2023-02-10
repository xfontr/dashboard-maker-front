import { screen } from "@testing-library/react";
import menuOptions from "../../../../common/menuOptions";
import { render } from "../../../../common/test-utils/customRender";
import { MenuOption } from "../../types/MenuOption";
import { baseMenuItems } from "./MenuItems";

const mockMenuItems: MenuOption[] = [{ ...menuOptions[0], className: "test" }];

/**
 * This is a mock instance of the actual MenuItems component. It's identical to
 * the actual one, but with only mock routes
 */
const MenuItems = baseMenuItems(mockMenuItems);

describe("Given a MenuItems component", () => {
  describe("When instantiated with items on full width", () => {
    test("Then it should render all the menu options with their attributes", () => {
      render(<MenuItems showOnlyIcon={false} />);

      const itemsList = screen.getByRole("list");
      const allItems = screen.getAllByRole("listitem");

      expect(itemsList).toBeInTheDocument();
      expect(allItems).toHaveLength(mockMenuItems.length);

      expect(allItems[0].className).toBe(
        `menu-item ${mockMenuItems[0].className}`
      );

      /**
       * If there are 'to' attributes, there will be links. At the moment all
       * the mock routes have links
       */
      const allLinks = screen.getAllByRole("link");
      expect(allLinks).toHaveLength(mockMenuItems.length);

      expect((allLinks[0] as HTMLAnchorElement).href).toBe(
        `http://localhost/${mockMenuItems[0].to}`
      );
    });
  });

  describe("When instantiated with items on contracted view", () => {
    test("Then it should render the menu options but only their icons", () => {
      render(<MenuItems showOnlyIcon={true} />);

      const view = [
        screen.getAllByRole("listitem")[0],
        screen.getAllByTestId("icon")[0],
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());

      const hiddenView = screen.queryByText(mockMenuItems[0].label);

      expect(hiddenView).not.toBeInTheDocument();
    });
  });
});
