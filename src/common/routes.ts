import { lazy } from "react";
import PATHS from "../config/paths";
import RouteConfig from "./components/Routes/Routes.types";

const routes: RouteConfig[] = [
  {
    path: PATHS.catch,
    roles: "all",
    Element: lazy(() => import("./pages/NotFound.page")),
  },
  {
    path: PATHS.root,
    roles: "all",
    to: PATHS.home,
  },
  {
    path: PATHS.home,
    roles: "all",
    Element: lazy(() => import("./pages/Home.page")),
  },
  {
    path: PATHS.unauthorized,
    roles: "all",
    Element: lazy(() => import("./pages/Unauthorized.page")),
  },
];

export default routes;
