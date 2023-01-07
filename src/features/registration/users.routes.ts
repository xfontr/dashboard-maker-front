import { lazy } from "react";
import RouteConfig from "../../common/components/Routes/Routes.types";
import PATHS from "../../config/paths";
import Layout from "./components/Layout/Layout";

const userRoutes = (): RouteConfig[] => [
  {
    path: PATHS.register,
    roles: "all",
    Element: lazy(() => import("./pages/SignUp.page")),
    Layout,
  },
  {
    path: PATHS.logIn,
    roles: "all",
  },
];

export default userRoutes;
