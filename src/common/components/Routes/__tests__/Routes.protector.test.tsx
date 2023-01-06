import { render, screen } from "@testing-library/react";
import Wrapper from "../../../test-utils/Wrapper";
import RoutesProtector from "../Routes.protector";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <>Outlet</>,
  Navigate: () => <>Navigate</>,
}));

describe("Given a RouteProtector component", () => {
  describe("When instantiated with its display condition as true", () => {
    test("Then it should render the Outlet component, that is, the required page", () => {
      render(<RoutesProtector condition={true} />, { wrapper: Wrapper });

      const outlet = screen.getByText("Outlet");

      expect(outlet).toBeInTheDocument();
    });
  });

  describe("When instantiated with its display condition as false", () => {
    test("Then it should navigate to another page", () => {
      render(<RoutesProtector condition={false} />, { wrapper: Wrapper });

      const navigate = screen.getByText("Navigate");

      expect(navigate).toBeInTheDocument();
    });
  });
});
