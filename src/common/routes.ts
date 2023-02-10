import { lazy } from "react";
import PATHS from "../config/paths";
import Layout from "../features/users/components/Layout/Layout";
import userRoutes from "../features/users/users.routes";
import RouteConfig from "./components/Routes/Routes.types";

const routes: RouteConfig[] = [
  {
    path: PATHS.catch,
    roles: ["admin", "user", "superAdmin", "notLogged"],
    Element: lazy(() => import("./pages/NotFound.page")),
    Layout,
  },
  {
    path: PATHS.root,
    roles: "all",
    rejectPath: PATHS.logIn,
    Element: lazy(() => import("./pages/Home.page")),
    layoutProps: {
      heading: "Overview",
      subheading: "See everything in one page",
    },
  },
  {
    path: PATHS.unauthorized,
    roles: "all",
    Element: lazy(() => import("./pages/Unauthorized.page")),
  },
  ...userRoutes(),
];

export default routes;
