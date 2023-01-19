import { render, screen } from "@testing-library/react";
import * as icons from "./Icon";

Object.entries(icons).forEach(([iconName, Icon]) => {
  describe(`Given an ${iconName} component`, () => {
    describe("When instantiated with a child 'Test' and a className 'Test'", () => {
      test("Then it should render said child in a container with the referred class", () => {
        const children = "Test";

        const view = render(
          <Icon className={children} data-testid="icon">
            {children}
          </Icon>
        );

        const iconChildren = screen.getByText(children);
        const parent = screen.getByTestId("icon");

        expect(iconChildren).toBeInTheDocument();
        expect(parent).toHaveClass(children);

        view.unmount();
      });
    });
  });
});
