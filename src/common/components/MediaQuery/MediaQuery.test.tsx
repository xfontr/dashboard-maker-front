import { render, screen } from "@testing-library/react";
import MediaQuery from "./MediaQuery";
import BREAKPOINTS from "../../../config/breakpoints";
import { baseWrapper } from "../../test-utils/Wrapper";

describe("Given a MediaQuery component", () => {
  describe("When instantiated with a min width of 'small'", () => {
    test("Then it should render the children if the client screen is of size 'medium'", () => {
      const children = "Test";
      const Wrapper = baseWrapper(undefined, BREAKPOINTS.medium);

      render(<MediaQuery screenSize="small">{children}</MediaQuery>, {
        wrapper: Wrapper,
      });

      const view = screen.getByText(children);

      expect(view).toBeInTheDocument();
    });

    test("Then it should not render the children if the client screen is of a smaller size", () => {
      const children = "Test";
      const Wrapper = baseWrapper(undefined, 100);

      render(<MediaQuery screenSize="small">{children}</MediaQuery>, {
        wrapper: Wrapper,
      });

      const view = screen.queryByRole(children);

      expect(view).not.toBeInTheDocument();
    });
  });

  describe("When instantiated with min width of 'small' and hasToMatch true", () => {
    test("Then it should render the children if the client screen is of any size fewer than 'small'", () => {
      const children = "Test";
      const Wrapper = baseWrapper(undefined, BREAKPOINTS.small - 0.1);

      render(
        <MediaQuery screenSize="small" hasToMatch={true}>
          {children}
        </MediaQuery>,
        {
          wrapper: Wrapper,
        }
      );

      const view = screen.getByText(children);

      expect(view).toBeInTheDocument();
    });

    test("Then it should not render the children if the client size is equal or higher than 'small'", () => {
      const children = "Test";
      const Wrapper = baseWrapper(undefined, BREAKPOINTS.small);

      render(
        <MediaQuery screenSize="small" hasToMatch={true}>
          {children}
        </MediaQuery>,
        {
          wrapper: Wrapper,
        }
      );

      const view = screen.queryByText(children);

      expect(view).not.toBeInTheDocument();
    });
  });
});
