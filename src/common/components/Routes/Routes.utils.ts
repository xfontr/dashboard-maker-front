import MAX_ROLE from "../../../config/maxRole";
import { RoutesUserRoles } from "./Routes.types";
import UserRoles from "../../types/UserRoles";

/**
 * Verifies if the current user role allows to perform an action which requires
 * a specific role.
 *
 * @returns If the current role fits in the required one, it will return true.
 *   Otherwise, it will return false
 */
export const hasAuthLevel = (
  currentRole: UserRoles,
  requiredRole: RoutesUserRoles
): boolean =>
  requiredRole === "all" ||
  (requiredRole === "max" && currentRole === MAX_ROLE) ||
  requiredRole.includes(currentRole);
