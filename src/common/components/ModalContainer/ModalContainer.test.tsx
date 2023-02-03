import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import ModalContainer from "./ModalContainer";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (element: ReactNode, node: HTMLElement) => element,
}));

describe("Given a ModalContainer component", () => {
  describe("When instantiated with chldren 'Test' and a class 'Test'", () => {
    test("Then it should render a dialog with said class and children", () => {
      const childrenAndClass = "Test";

      render(
        <ModalContainer className={childrenAndClass}>
          {childrenAndClass}
        </ModalContainer>
      );

      const dialog = screen.getByRole("dialog");
      const view = screen.getByText(childrenAndClass);

      expect(dialog).toBeInTheDocument();
      expect(view).toBeInTheDocument();
      expect(dialog).toHaveClass(childrenAndClass);
    });
  });

  describe("When instantiated with a backdro and children 'Test'", () => {
    test("Then it should render said children inside the backdrop", () => {
      const childrenAndClass = "Test";

      render(
        <ModalContainer backDrop={true}>{childrenAndClass}</ModalContainer>
      );

      const backdrop = screen.getByTestId("backdrop");
      const view = screen.getByText(childrenAndClass);

      expect(view).toBeInTheDocument();
      expect(backdrop).toBeInTheDocument();
    });
  });
});
