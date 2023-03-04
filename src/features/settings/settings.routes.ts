import { lazy } from "react";
import RouteConfig from "../../common/components/Routes/Routes.types";
import PATHS from "../../config/paths";

const settingsRoutes = (): RouteConfig[] => [
  {
    path: PATHS.settings,
    roles: ["admin", "superAdmin", "user"],
    Element: lazy(() => import("./pages/MainSettings.page")),
  },
];

export default settingsRoutes;
