import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { VERIFY_TOKEN_UI } from "../../../../../features/users/config/ui.constants";
import { MODAL_CLOSING_TIME } from "../../../../hooks/useUiModal";
import { renderHook } from "../../../../test-utils/customRender";
import { useUi, useUiMiddlewares } from "../ui.hooks";
import { uiSlice } from "../ui.slice";

jest.useFakeTimers();

describe("Given a useUi hook", () => {
  describe("When called", () => {
    test("Then it should return the ui state and a dispatcher", () => {
      const {
        result: {
          current: { dispatch, ui },
        },
      } = renderHook(useUi);

      expect(ui).toStrictEqual(uiSlice.initialState);
      expect(dispatch).not.toBeNull();
    });
  });
});

describe("Given a useUiMiddlewares hook", () => {
  describe("When called with all UI messages", () => {
    describe("And returned a showLoadingUi function", () => {
      test("Then, when called, it should show change the ui status to 'LOADING' with a message", () => {
        const expectedUi = {
          status: "LOADING",
          message: VERIFY_TOKEN_UI.loading,
        };

        const { result } = renderHook(() => useUiMiddlewares(VERIFY_TOKEN_UI));

        expect(result.current.ui.status).toBe(uiSlice.initialState.status);

        act(() => {
          result.current.showLoadingUi();
        });

        expect(result.current.ui).toStrictEqual(expectedUi);
      });
    });

    describe("And returned a showErrorUi function", () => {
      test("Then, when called, it should show change the ui status to 'ERROR' with a message", () => {
        const expectedUi = {
          status: "ERROR",
          message: VERIFY_TOKEN_UI.error,
        };

        const { result } = renderHook(() => useUiMiddlewares(VERIFY_TOKEN_UI));

        expect(result.current.ui.status).toBe(uiSlice.initialState.status);

        act(() => {
          result.current.showErrorUi();
        });

        expect(result.current.ui).toStrictEqual(expectedUi);
      });
    });

    describe("And returned a showSuccessUi function", () => {
      test("Then, when called, it should show change the ui status to 'SUCCESS' with a message", () => {
        const expectedUi = {
          status: "SUCCESS",
          message: VERIFY_TOKEN_UI.success,
        };

        const { result } = renderHook(() => useUiMiddlewares(VERIFY_TOKEN_UI));

        expect(result.current.ui.status).toBe(uiSlice.initialState.status);

        act(() => {
          result.current.showSuccessUi();
        });

        expect(result.current.ui).toStrictEqual(expectedUi);
      });
    });

    describe("And returned a resetUi function", () => {
      test("Then, when called, it should show change the ui status to 'IDLE' with no message, after some ms", async () => {
        const expectedUi = {
          status: "IDLE",
          message: "",
        };

        const { result } = renderHook(() => useUiMiddlewares(VERIFY_TOKEN_UI));

        expect(result.current.ui.status).toBe(uiSlice.initialState.status);

        act(() => {
          result.current.resetUi();
        });

        jest.advanceTimersByTime(MODAL_CLOSING_TIME);

        await waitFor(() => {
          expect(result.current.ui).toStrictEqual(expectedUi);
        });
      });
    });
  });

  describe("When called with no UI messages", () => {
    describe("And called all of the returned functions", () => {
      test("Every time the status should be updated to 'IDLE' after some ms", async () => {
        const expectedStatus = "IDLE";

        const { result } = renderHook(() => useUiMiddlewares({}));

        act(() => {
          result.current.showErrorUi();
        });

        jest.advanceTimersByTime(MODAL_CLOSING_TIME);

        await waitFor(() => {
          expect(result.current.ui.status).toBe(expectedStatus);
        });

        act(() => {
          result.current.showSuccessUi();
        });

        jest.advanceTimersByTime(MODAL_CLOSING_TIME);

        await waitFor(() => {
          expect(result.current.ui.status).toBe(expectedStatus);
        });

        act(() => {
          result.current.showLoadingUi();
        });

        jest.advanceTimersByTime(MODAL_CLOSING_TIME);

        await waitFor(() => {
          expect(result.current.ui.status).toBe(expectedStatus);
        });
      });
    });
  });
});
