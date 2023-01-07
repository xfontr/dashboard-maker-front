import { PropsWithChildren } from "react";
import UserRoles from "../../types/UserRoles";

export type RoutesUserRoles = "all" | UserRoles[] | "max";

type RouteConfig = {
  path: string;
  roles: RoutesUserRoles;
  name?: string;
  to?: string;
  Element?: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
  Layout?: ({ children }: PropsWithChildren) => JSX.Element;
  rejectPath?: string;
};

export default RouteConfig;
