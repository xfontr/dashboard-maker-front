import { PropsWithChildren } from "react";
import { DashboardLayoutProps } from "../../../features/sideboard/components/DashboardLayout/DashboardLayout";
import UserRoles from "../../types/UserRoles";

export type RoutesUserRoles = "all" | UserRoles[] | "max";

type RouteConfig = {
  path: string;
  roles: RoutesUserRoles;
  name?: string;
  to?: string;
  Element?: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
  rejectPath?: string;
  Layout?: ({ children }: PropsWithChildren) => JSX.Element;
  layoutProps?: Omit<DashboardLayoutProps, "children">;
};

export default RouteConfig;
