import { mockRoutes } from "../../../test-utils/mocks/";
import { baseRoutes } from "../Routes";
import { render, screen } from "@testing-library/react";
import PATHS from "../../../../config/paths";
import { baseWrapper } from "../../../test-utils/Wrapper";

const Routes = baseRoutes(mockRoutes);

describe("Given a Routes component", () => {
  describe("When called with a role 'superAdmin'", () => {
    test(`Then it should render the path ${PATHS.home}}`, () => {
      const Wrapper = baseWrapper([PATHS.home]);
      render(<Routes role="superAdmin" />, { wrapper: Wrapper });

      const view = screen.getByText("Home");

      expect(view).toBeInTheDocument();
    });

    test("Then it should render the path '/super-admin'", () => {
      const protectedPath = "/super-admin";
      const Wrapper = baseWrapper([protectedPath]);

      render(<Routes role="superAdmin" />, { wrapper: Wrapper });

      const view = screen.getByText("Super admin");

      expect(view).toBeInTheDocument();
    });

    test("Then it should render the path '/max'", () => {
      const maxAuthPath = "/max";
      const Wrapper = baseWrapper([maxAuthPath]);

      render(<Routes role="superAdmin" />, { wrapper: Wrapper });

      const view = screen.getByText("Super admin");

      expect(view).toBeInTheDocument();
    });

    test("Then it should not render the path '/admin'", () => {
      const protectedPath = "/admin";
      const Wrapper = baseWrapper([protectedPath]);

      render(<Routes role="superAdmin" />, { wrapper: Wrapper });

      const notView = screen.queryByText("Admin");
      const view = screen.getByText("Unauthorized");

      expect(notView).not.toBeInTheDocument();
      expect(view).toBeInTheDocument();
    });

    test("Then it should render the not found page for the path '/random-aaa111'", () => {
      const badPath = "/randomaaa111";
      const Wrapper = baseWrapper([badPath]);

      render(<Routes role="superAdmin" />, { wrapper: Wrapper });

      const view = screen.getByText("Not found");

      expect(view).toBeInTheDocument();
    });
  });

  describe("When called with a role 'user'", () => {
    test(`Then it should render the path ${PATHS.home}}`, () => {
      const Wrapper = baseWrapper([PATHS.home]);

      render(<Routes role="user" />, { wrapper: Wrapper });

      const view = screen.getByText("Home");

      expect(view).toBeInTheDocument();
    });

    test("Then it should not render the path '/super-admin'", () => {
      const protectedPath = "/super-admin";
      const Wrapper = baseWrapper([protectedPath]);

      render(<Routes role="user" />, { wrapper: Wrapper });

      const notView = screen.queryByText("Super admin");
      const view = screen.getByText("Unauthorized");

      expect(notView).not.toBeInTheDocument();
      expect(view).toBeInTheDocument();
    });

    test("Then it should not render the path '/max'", () => {
      const maxAuthPath = "/max";
      const Wrapper = baseWrapper([maxAuthPath]);

      render(<Routes role="user" />, { wrapper: Wrapper });

      const notView = screen.queryByText("Super admin");
      const view = screen.getByText("Unauthorized");

      expect(notView).not.toBeInTheDocument();
      expect(view).toBeInTheDocument();
    });

    test("Then it should render the not found page for the path '/random-aaa111'", () => {
      const badPath = "/randomaaa111";
      const Wrapper = baseWrapper([badPath]);

      render(<Routes role="user" />, { wrapper: Wrapper });

      const view = screen.getByText("Not found");

      expect(view).toBeInTheDocument();
    });
  });

  describe("When called with a role 'admin'", () => {
    test(`Then it should render the path ${PATHS.home}}`, () => {
      const Wrapper = baseWrapper([PATHS.home]);

      render(<Routes role="admin" />, { wrapper: Wrapper });

      const view = screen.getByText("Home");

      expect(view).toBeInTheDocument();
    });

    test("Then it should not render the path '/super-admin'", () => {
      const protectedPath = "/super-admin";
      const Wrapper = baseWrapper([protectedPath]);

      render(<Routes role="admin" />, { wrapper: Wrapper });

      const notView = screen.queryByText("Super admin");
      const view = screen.getByText("Unauthorized");

      expect(notView).not.toBeInTheDocument();
      expect(view).toBeInTheDocument();
    });

    test("Then it should not render the path '/max'", () => {
      const maxAuthPath = "/max";
      const Wrapper = baseWrapper([maxAuthPath]);

      render(<Routes role="admin" />, { wrapper: Wrapper });

      const notView = screen.queryByText("Super admin");
      const view = screen.getByText("Unauthorized");

      expect(notView).not.toBeInTheDocument();
      expect(view).toBeInTheDocument();
    });

    test("Then it should render the path '/admin'", () => {
      const adminPath = "/admin";
      const Wrapper = baseWrapper([adminPath]);

      render(<Routes role="admin" />, { wrapper: Wrapper });

      const view = screen.getByText("Admin");

      expect(view).toBeInTheDocument();
    });

    test("Then it should render the not found page for the path '/random-aaa111'", () => {
      const badPath = "/randomaaa111";
      const Wrapper = baseWrapper([badPath]);

      render(<Routes role="admin" />, { wrapper: Wrapper });

      const view = screen.getByText("Not found");

      expect(view).toBeInTheDocument();
    });
  });

  describe("When called with any role and with a route that has a heading", () => {
    test("Then it should render the route with its heading data", () => {
      const Wrapper = baseWrapper(["/layout-with-heading"]);

      render(<Routes role="user" />, { wrapper: Wrapper });

      const heading = [
        screen.getByText(mockRoutes[7].layoutProps?.heading!),
        screen.getByText(mockRoutes[7].layoutProps?.subheading!),
      ];

      heading.forEach((node) => expect(node).toBeInTheDocument());
    });
  });
});
