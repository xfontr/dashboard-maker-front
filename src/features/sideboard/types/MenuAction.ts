import { IconProps } from "../../../common/components/Icon/Icon";
import PATHS from "../../../config/paths";

export type MenuAction = {
  label: string;
  Icon: (args: IconProps) => JSX.Element;
  to: keyof typeof PATHS;
};
