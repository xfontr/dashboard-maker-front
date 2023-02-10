import menuOptions from "../../../common/menuOptions";
import MenuItem from "../components/MenuItem/MenuItem";
import { MenuOption } from "../types/MenuOption";

type MenuItemsProps = {
  showOnlyIcon: boolean;
};

export const baseMenuItems =
  (options: MenuOption[]) =>
  ({ showOnlyIcon }: MenuItemsProps): JSX.Element =>
    (
      <>
        {options.map(({ label, Icon, to, ...rest }) => (
          <MenuItem
            {...{ label, Icon, showOnlyIcon, to, ...rest }}
            key={label}
          />
        ))}
      </>
    );

export const MenuItems = baseMenuItems(menuOptions);
