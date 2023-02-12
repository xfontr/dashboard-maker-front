import { screen } from "@testing-library/react";
import { DashboardLayoutProps } from "../../../../features/menu/components/DashboardLayout/DashboardLayout";
import { notFoundHeading } from "../../../pages/NotFound.page";
import { render } from "../../../test-utils/customRender";
import RoutesRender from "../Routes.render";

const MockLayout = (props: DashboardLayoutProps) => (
  <>
    Layout: {props.children}
    {Object.values(props).map((value) => (
      <span>{value}</span>
    ))}
  </>
);

const MockElement = () => <>Element</>;

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: ({ to }: { to: string }) => <>{to}</>,
}));

describe("Given a RoutesRender component", () => {
  describe("When instantiated with a Layout and an Element", () => {
    test("Then it should render the Element inside the Layout", () => {
      render(<RoutesRender Element={MockElement} Layout={MockLayout} />);

      const view = screen.getByText("Layout: Element");

      expect(view).toBeInTheDocument();
    });

    test("Then it should render the layout props, if any", () => {
      const layoutProps = {
        heading: "Heading",
        subheading: "Subheading",
        className: "className",
      };

      render(
        <RoutesRender
          Element={MockElement}
          Layout={MockLayout}
          layoutProps={layoutProps}
        />
      );

      const view = [
        screen.getByText(layoutProps.heading),
        screen.getByText(layoutProps.subheading),
        screen.getByText(layoutProps.className),
      ];

      view.forEach((node) => expect(node).toBeInTheDocument());
    });
  });

  describe("When instantiated with only an Element", () => {
    test("Then it should render the element with no layout", () => {
      render(<RoutesRender Element={MockElement} />);

      const view = screen.getByText("Element");

      expect(view).toBeInTheDocument();
    });
  });

  describe("When instantiated with only a 'to' param", () => {
    test("Then it should navigate to the specified path", () => {
      const path = "/home";

      render(<RoutesRender to={path} />);

      const view = screen.getByText(path);

      expect(view).toBeInTheDocument();
    });
  });

  describe("When instantiated with nothing", () => {
    test("Then it should render the not found page", () => {
      render(<RoutesRender />);

      const view = screen.getByText(notFoundHeading.heading!);

      expect(view).toBeInTheDocument();
    });
  });
});
