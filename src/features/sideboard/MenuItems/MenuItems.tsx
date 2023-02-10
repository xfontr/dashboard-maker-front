import menuOptions from "../../../common/menuOptions";
import MenuItem from "../components/MenuItem/MenuItem";
import { MenuOption } from "../types/MenuOption";
import "./MenuItems.scss";

type MenuItemsProps = {
  showOnlyIcon: boolean;
};

export const baseMenuItems =
  (options: MenuOption[]) =>
  ({ showOnlyIcon }: MenuItemsProps): JSX.Element =>
    (
      <ul className="sideboard__items">
        {options.map(({ label, Icon, to, ...rest }) => (
          <MenuItem
            {...{ label, Icon, showOnlyIcon, to, ...rest }}
            key={label}
          />
        ))}
      </ul>
    );

export const MenuItems = baseMenuItems(menuOptions);
