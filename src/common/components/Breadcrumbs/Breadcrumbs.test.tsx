import { render, screen } from "@testing-library/react";
import { baseWrapper } from "../../test-utils/Wrapper";
import Breadcrumbs from "./BreadCrumbs";

describe("Given a Breadcrumbs component", () => {
  describe("When instantiated and the route is '/news/fake-page'", () => {
    test("Then it should display a link to home and /fake-page, and a text '/news'", () => {
      const falsePath = "/news/fake-page";
      const Wrapper = baseWrapper([falsePath]);

      render(<Breadcrumbs />, { wrapper: Wrapper });

      const breadcrumbs = [
        screen.getByRole("link", { name: "home" }),
        screen.getByRole("link", { name: "/ news" }),
        screen.getByText("/ fake-page"),
      ];

      breadcrumbs.forEach((path) => expect(path).toBeInTheDocument());
    });
  });
});
