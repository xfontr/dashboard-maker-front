import { HTMLAttributes, ReactNode } from "react";
import { IconProps } from "../../../../common/components/Icon/Icon";
import setMenuItemProps from "../../utils/setMenuItemProps";
import "./MenuItem.scss";

interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
  label: ReactNode | string;
  Icon?: (args: IconProps) => JSX.Element;
  showOnlyIcon?: boolean;
}

/**
 * @returns The label passed, applying the menu styling. It allows not only
 *   strings, but any sort of react node to allow flexibility.
 *
 *   CAUTION: This element must be used only in the context of a list (<ul></ul>)
 */

const MenuItem = ({
  label,
  Icon,
  showOnlyIcon = false,
  ...rest
}: MenuItemProps) => (
  <li {...setMenuItemProps(rest, showOnlyIcon)}>
    {Icon && <Icon data-testid="icon" />}
    {showOnlyIcon || label}
  </li>
);

export default MenuItem;
