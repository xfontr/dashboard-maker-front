import routes from "../../routes";
import RouteConfig from "./Routes.types";
import { Routes as ReactRoutes, Route, Navigate } from "react-router-dom";
import UserRoles from "../../types/UserRoles";
import RoutesProtector from "./Routes.protector";
import { hasAuthLevel } from "./Routes.utils";

type RoutesProps = {
  role: UserRoles;
};

export const baseRoutes =
  (routes: RouteConfig[]) =>
  ({ role }: RoutesProps): JSX.Element =>
    (
      <ReactRoutes>
        {routes.map(({ path, Element, to, roles, rejectPath }) => (
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
              element={Element ? <Element /> : <Navigate to={to!} />}
            />
          </Route>
        ))}
      </ReactRoutes>
    );

const Routes = baseRoutes(routes);

export default Routes;
