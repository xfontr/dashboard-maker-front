import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { MODAL_CLOSING_TIME, MODAL_LIFE } from "../../hooks/useUiModal";
import { uiSlice } from "../../store/slices/ui";
import { render } from "../../test-utils/customRender";
import UiModal, { icons } from "./UiModal";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: (element: ReactNode, node: HTMLElement) => element,
}));

jest.useFakeTimers();

icons.LOADING = () => <>mockLoadingIcon</>;

icons.ERROR = () => <>mockErrorIcon</>;

icons.SUCCESS = () => <>mockSuccessIcon</>;

describe("Given a UiModal component", () => {
  describe("When called with a ui status of 'LOADING' and a message 'Loading...'", () => {
    test("Then it should display said message with a loading icon", () => {
      const modalText = "Loading...";

      uiSlice.initialState.status = "LOADING";
      uiSlice.initialState.message = modalText;

      render(<UiModal />);

      const loading = [
        screen.getByText(modalText),
        screen.getByText("mockLoadingIcon"),
      ];

      loading.forEach((node) => expect(node).toBeInTheDocument());
    });

    test("Wen changing to 'ERROR' it should show error", () => {
      const modalText = "Error";

      uiSlice.initialState.status = "ERROR";
      uiSlice.initialState.message = modalText;

      render(<UiModal />);

      const error = [
        screen.getByText(modalText),
        screen.getByText("mockErrorIcon"),
      ];

      error.forEach((node) => expect(node).toBeInTheDocument());
    });

    test("When changing to error and after 1.750ms, it should disappear", async () => {
      const modalText = "Error";

      uiSlice.initialState.status = "ERROR";
      uiSlice.initialState.message = modalText;

      render(<UiModal />);

      jest.advanceTimersByTime(MODAL_LIFE + MODAL_CLOSING_TIME);

      const idle = screen.queryByText(modalText);

      await waitFor(() => {
        expect(idle).not.toBeInTheDocument();
      });
    });

    test("Wen changing to 'SUCCESS' it should show error", () => {
      const modalText = "Success";

      uiSlice.initialState.status = "SUCCESS";
      uiSlice.initialState.message = modalText;

      render(<UiModal />);

      const success = [
        screen.getByText(modalText),
        screen.getByText("mockSuccessIcon"),
      ];

      success.forEach((node) => expect(node).toBeInTheDocument());
    });

    test("When changing to success and after 1.750ms, it should disappear", async () => {
      const modalText = "Success";

      uiSlice.initialState.status = "SUCCESS";
      uiSlice.initialState.message = modalText;

      render(<UiModal />);

      jest.advanceTimersByTime(MODAL_LIFE + MODAL_CLOSING_TIME);

      const idle = screen.queryByText(modalText);

      await waitFor(() => {
        expect(idle).not.toBeInTheDocument();
      });
    });

    test("When clicking the close button, it should close after 250ms", async () => {
      const modalText = "Loading...";

      uiSlice.initialState.status = "LOADING";
      uiSlice.initialState.message = modalText;

      render(<UiModal />);

      const closeButton = screen.getByRole("button", { name: "close" });
      expect(closeButton).toBeInTheDocument();

      await waitFor(async () => {
        await userEvent.click(closeButton);
      });

      const modal = screen.getByText(modalText);
      expect(modal).toBeInTheDocument();

      jest.advanceTimersByTime(MODAL_CLOSING_TIME);

      const idle = screen.queryByText(modalText);

      await waitFor(() => {
        expect(idle).not.toBeInTheDocument();
      });
    });
  });
});
