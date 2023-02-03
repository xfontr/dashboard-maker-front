import { lazy } from "react";
import PATHS from "../config/paths";
import userRoutes from "../features/users/users.routes";
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
    rejectPath: PATHS.logIn,
    Element: lazy(() => import("./pages/Home.page")),
  },
  {
    path: PATHS.unauthorized,
    roles: "all",
    Element: lazy(() => import("./pages/Unauthorized.page")),
  },
  ...userRoutes(),
];

export default routes;
