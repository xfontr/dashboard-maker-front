import { render, screen } from "@testing-library/react";
import Page, { PageProps } from "./Page";

describe("Given a Page component", () => {
  describe("When instantiated with a title, a subheading, a class and a child 'Test'", () => {
    test("Then it should render both texts and the child", () => {
      const children = "Test";
      const headingInfo: Omit<PageProps, "children"> = {
        heading: "Heading",
        subheading: "Subheading",
      };
      const className = "test-class";

      render(
        <Page {...headingInfo} {...{ className }} data-testid="test">
          {children}
        </Page>
      );

      const view = [
        screen.getByRole("heading", { name: headingInfo.heading }),
        screen.getByText(headingInfo.subheading!),
        screen.getByText(children),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());

      const container = screen.getByTestId("test");
      expect(container).toHaveClass("page-header test-class");

      const notView = screen.queryByTestId("breadcrumbs");

      expect(notView).not.toBeInTheDocument();
    });
  });

  describe("When instantiated with only a title", () => {
    test("It should only render said title", () => {
      render(<Page heading="heading" />);

      const heading = screen.getByRole("heading", { name: "heading" });

      expect(heading).toBeInTheDocument();
    });
  });

  describe("When instantiated with nothing", () => {
    test("Then it should render nothing", () => {
      render(<Page data-testid="page" />);

      const view = screen.getByTestId("page");

      expect(view).toBeEmptyDOMElement();
    });
  });

  describe("When instantiated with breadcrumbs", () => {
    test("Then it should render them", () => {
      render(<Page hasBreadcrumbs={true} />);

      const view = screen.getByTestId("breadcrumbs");

      expect(view).toBeInTheDocument();
    });
  });
});
