import { HTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { IconProps } from "../../../../common/components/Icon/Icon";
import PATHS from "../../../../config/paths";
import setMenuItemProps from "../../utils/setMenuItemProps";
import "./MenuItem.scss";

interface MenuItemProps extends HTMLAttributes<HTMLLIElement> {
  label: ReactNode | string;
  Icon?: (args: IconProps) => JSX.Element;
  to?: keyof typeof PATHS;
  showOnlyIcon?: boolean;
}

/** CAUTION: This element must be used only in the context of a list (<ul></ul>) */

const MenuItem = ({
  label,
  Icon,
  showOnlyIcon = false,
  to,
  ...rest
}: MenuItemProps) => {
  const ItemContent = (
    <>
      {Icon && <Icon data-testid="icon" />}
      {showOnlyIcon || label}
    </>
  );

  return (
    <li {...setMenuItemProps(rest, showOnlyIcon)}>
      {to ? <Link to={PATHS[to]}>{ItemContent}</Link> : ItemContent}
    </li>
  );
};

export default MenuItem;
