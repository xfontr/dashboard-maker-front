import { HTMLAttributes } from "react";
import setProps from "../../../common/utils/setProps";

const setMenuItemProps = <T = unknown>(
  props: HTMLAttributes<T>,
  children: boolean,
  onlyIcon: boolean
) => {
  const isFoldable = children ? " menu-item--foldable" : "";
  const isClickable = props.onClick ? " menu-item--clickable" : "";
  const isContracted = onlyIcon ? " menu-item--contracted" : "";

  return setProps(
    props,
    "className",
    `menu-item${isFoldable}${isClickable}${isContracted}`
  );
};

export default setMenuItemProps;
