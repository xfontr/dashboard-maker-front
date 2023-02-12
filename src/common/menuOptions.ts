import { MenuOption } from "../features/menu/types/MenuOption";
import { DashboardIcon } from "./components/Icon/Icon";

const menuOptions: MenuOption[] = [
  {
    label: "Overview",
    Icon: DashboardIcon,
    to: "home",
  },
];

export default menuOptions;
