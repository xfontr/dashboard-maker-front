import { HTMLAttributes } from "react";
import { IconProps } from "../../../common/components/Icon/Icon";
import PATHS from "../../../config/paths";

export interface MenuOption extends HTMLAttributes<HTMLLIElement> {
  label: string;
  Icon: (args: IconProps) => JSX.Element;
  to?: keyof typeof PATHS;
}
