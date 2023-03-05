import menuOptions from "../../../../common/menuOptions";
import MenuItem from "../MenuItem/MenuItem";
import { MenuOption } from "../../types/MenuOption";
import "./MenuItems.scss";

type MenuItemsProps = {
  showOnlyIcon: boolean;
  globalAction?: () => void;
};

export const baseMenuItems =
  (options: MenuOption[]) =>
  ({ showOnlyIcon, globalAction }: MenuItemsProps): JSX.Element =>
    (
      <ul className="sideboard__items">
        {options.map(({ label, Icon, to, ...rest }) => (
          <MenuItem
            {...{ label, Icon, showOnlyIcon, to, ...rest }}
            onClick={globalAction}
            key={label}
          />
        ))}
      </ul>
    );

export const MenuItems = baseMenuItems(menuOptions);
