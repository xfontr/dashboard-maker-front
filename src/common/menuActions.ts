import { MenuAction } from "../features/sideboard/types/MenuAction";
import { CloseIcon } from "./components/Icon/Icon";

const menuActions: MenuAction[] = [
  {
    label: "Overview",
    Icon: CloseIcon,
    to: "home",
  },
];

export default menuActions;
