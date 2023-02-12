import { screen } from "@testing-library/react";
import { render } from "../../../../common/test-utils/customRender";
import { baseWrapper } from "../../../../common/test-utils/Wrapper";
import BREAKPOINTS from "../../../../config/breakpoints";
import Menu from "./Menu";

describe("Given a Menu component", () => {
  describe("When instantiated with a screen size smaller than 'smallMedium'", () => {
    test("Then it should render a burger menu", () => {
      const Wrapper = baseWrapper(undefined, BREAKPOINTS.small);

      render(<Menu />, { wrapper: Wrapper });

      const burgerButton = screen.getByRole("button", {
        name: "Open burger menu",
      });

      expect(burgerButton).toBeInTheDocument();
    });
  });

  describe("When instantiated with a screen size equal or higher than 'smallMedium'", () => {
    test("then it should render a sideboard", () => {
      const Wrapper = baseWrapper(undefined, BREAKPOINTS.smallMedium);

      render(<Menu />, { wrapper: Wrapper });

      const burgerButton = screen.queryByRole("button", {
        name: "Open burger menu",
      });

      const expandButton = screen.getByRole("button", {
        name: "Contract menu",
      });

      expect(burgerButton).not.toBeInTheDocument();
      expect(expandButton).toBeInTheDocument();
    });
  });
});
