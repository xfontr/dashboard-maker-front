import PATHS from "../../../config/paths";
import RouteConfig from "../../components/Routes/Routes.types";
import {
  mockAdminPage,
  mockHomePage,
  mockNotFoundPage,
  mockSuperAdminPage,
  mockUnauthorizedPage,
} from "./mockPage";

const mockRoutes: RouteConfig[] = [
  {
    path: PATHS.catch,
    roles: "all",
    Element: mockNotFoundPage,
  },
  {
    path: PATHS.root,
    roles: "all",
    to: PATHS.home,
  },
  {
    path: PATHS.home,
    roles: "all",
    Element: mockHomePage,
  },
  {
    path: "/super-admin",
    roles: ["superAdmin"],
    Element: mockSuperAdminPage,
    rejectPath: PATHS.unauthorized,
  },
  {
    path: "/admin",
    roles: ["admin"],
    Element: mockAdminPage,
    rejectPath: PATHS.unauthorized,
  },
  {
    path: "/max",
    roles: "max",
    Element: mockSuperAdminPage,
    rejectPath: PATHS.unauthorized,
  },
  {
    path: PATHS.unauthorized,
    roles: "all",
    Element: mockUnauthorizedPage,
  },
];

export default mockRoutes;
