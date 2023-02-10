import routes from "../../routes";
import RouteConfig from "./Routes.types";
import { Routes as ReactRoutes, Route } from "react-router-dom";
import UserRoles from "../../types/UserRoles";
import RoutesProtector from "./Routes.protector";
import { hasAuthLevel } from "./Routes.utils";
import RoutesRender from "./Routes.render";

type RoutesProps = {
  role: UserRoles;
};

export const baseRoutes =
  (routes: RouteConfig[]) =>
  ({ role }: RoutesProps): JSX.Element =>
    (
      <ReactRoutes>
        {routes.map(
          ({ path, Element, to, roles, rejectPath, Layout, layoutProps }) => (
            <Route
              {...{ path }}
              element={
                <RoutesProtector
                  condition={hasAuthLevel(role, roles)}
                  {...{ rejectPath }}
                />
              }
              key={path}
            >
              <Route
                {...{ path }}
                element={
                  <RoutesRender {...{ Element, to, Layout, layoutProps }} />
                }
              />
            </Route>
          )
        )}
      </ReactRoutes>
    );

const Routes = baseRoutes(routes);

export default Routes;
