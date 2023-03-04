import { lazy } from "react";
import RouteConfig from "../../common/components/Routes/Routes.types";
import PATHS from "../../config/paths";

const settingsRoutes = (): RouteConfig[] => [
  {
    path: PATHS.settings,
    roles: ["admin", "superAdmin", "user"],
    Element: lazy(() => import("./pages/MainSettings.page")),
    layoutProps: {
      heading: "Settings",
      subheading: "Check and update your profile and security settings.",
    },
  },
];

export default settingsRoutes;