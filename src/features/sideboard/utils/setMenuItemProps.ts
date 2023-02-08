import { HTMLAttributes } from "react";
import setProps from "../../../common/utils/setProps";

const setMenuItemProps = (
  props: HTMLAttributes<HTMLLIElement>,
  onlyIcon: boolean
) => {
  const isClickable = props.onClick ? " menu-item--clickable" : "";
  const isContracted = onlyIcon ? " menu-item--contracted" : "";

  return setProps(props, "className", `menu-item${isClickable}${isContracted}`);
};

export default setMenuItemProps;
