import { hasAuthLevel } from "../Routes.utils";
import { RoutesUserRoles } from "../Routes.types";
import MAX_ROLE from "../../../../config/maxRole";

describe("Given a hasAuthLevel function", () => {
  describe("When called with a role of 'user'", () => {
    const role = "user";

    describe("And the required role is 'all'", () => {
      test("Then it should return true", () => {
        const requiredRole: RoutesUserRoles = "all";

        const result = hasAuthLevel(role, requiredRole);

        expect(result).toBeTruthy();
      });
    });

    describe("And the required role is 'max'", () => {
      test("Then it should return false", () => {
        const requiredRole: RoutesUserRoles = "max";

        const result = hasAuthLevel(role, requiredRole);

        expect(result).toBeFalsy();
      });
    });

    describe("And the required role other than 'user'", () => {
      test("Then it should return false", () => {
        const requiredRole: RoutesUserRoles = ["admin", "superAdmin"];

        const result = hasAuthLevel(role, requiredRole);

        expect(result).toBeFalsy();
      });
    });
  });

  describe(`When called with a role of ${MAX_ROLE}`, () => {
    describe("And the required role is 'max'", () => {
      test("Then it should return true", () => {
        const requiredRole: RoutesUserRoles = "max";

        const result = hasAuthLevel(MAX_ROLE, requiredRole);

        expect(result).toBeTruthy();
      });
    });
  });
});
