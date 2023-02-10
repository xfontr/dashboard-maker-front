import { render, screen } from "@testing-library/react";
import { baseWrapper } from "../../test-utils/Wrapper";
import Breadcrumbs from "./BreadCrumbs";

describe("Given a Breadcrumbs component", () => {
  describe("When instantiated with a class 'Test' and the route is '/news/fake-page'", () => {
    test("Then it should display a link to home and /fake-page, and a text '/news'", () => {
      const className = "Test";
      const falsePath = "/news/fake-page";
      const Wrapper = baseWrapper([falsePath]);

      render(<Breadcrumbs data-testid="breadcrumbs" {...{ className }} />, {
        wrapper: Wrapper,
      });

      const breadcrumbs = [
        screen.getByRole("link", { name: "home" }),
        screen.getByRole("link", { name: "/ news" }),
        screen.getByText("/ fake-page"),
      ];

      breadcrumbs.forEach((path) => expect(path).toBeInTheDocument());

      const wrapper = screen.getByTestId("breadcrumbs");
      expect(wrapper).toHaveClass(className);
    });
  });
});
