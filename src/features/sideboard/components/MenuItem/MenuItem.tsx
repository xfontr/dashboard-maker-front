import { HTMLAttributes, ReactNode } from "react";
import { IconProps } from "../../../../common/components/Icon/Icon";
import setMenuItemProps from "../../utils/setMenuItemProps";
import "./MenuItem.scss";

interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
  label: ReactNode | string;
  Icon?: (args: IconProps) => JSX.Element;
  children?: ReactNode[];
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
  children,
  showOnlyIcon = false,
  ...rest
}: MenuItemProps) => (
  <li {...setMenuItemProps(rest, !!children, showOnlyIcon)}>
    {Icon && <Icon />}
    {showOnlyIcon || label}
  </li>
);

export default MenuItem;
