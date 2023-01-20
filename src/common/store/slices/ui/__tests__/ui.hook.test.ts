import { act } from "react-dom/test-utils";
import { TOKEN_SIDE_EFFECTS } from "../../../../../features/users/hooks/useRegistration.constants";
import { renderHook } from "../../../../test-utils/customRender";
import useUi from "../ui.hook";
import { uiSlice } from "../ui.slice";

describe("Given a useUi hook", () => {
  describe("When called", () => {
    test("Then it should return the ui state and  a dispatcher", () => {
      const {
        result: {
          current: { dispatch, ui },
        },
      } = renderHook(useUi);

      expect(ui).toStrictEqual(uiSlice.initialState);
      expect(dispatch).not.toBeNull();
    });
  });

  describe("When called its returned function handleSideEffects with token side effects", () => {
    describe("And when called both of its returned functions with a callback with no error", () => {
      const mockResponse = {
        status: TOKEN_SIDE_EFFECTS.successCondition[1],
      };
      const callback = () => mockResponse;
      const successCallback = jest.fn();

      test("Then it should update the dispatch to a loading status and then success, call both callbacks, and return the response", async () => {
        const { result } = renderHook(useUi);

        expect(result.current.ui.status).toBe("IDLE");

        const callCallback =
          result.current.handleSideEffects(TOKEN_SIDE_EFFECTS);

        let callSuccess: Function;

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
          callSuccess = await callCallback(callback);
        });

        expect(result.current.ui.status).toBe("LOADING");
        expect(result.current.ui.message).toBe(TOKEN_SIDE_EFFECTS.loading);

        await act(async () => {
          const response = await callSuccess(successCallback);
          expect(response).toStrictEqual(mockResponse);
        });

        expect(successCallback).toHaveBeenCalledWith(mockResponse);
        expect(result.current.ui.status).toBe("SUCCESS");
        expect(result.current.ui.message).toBe(TOKEN_SIDE_EFFECTS.success);
      });
    });

    describe("And when called both of its returned functions but with only one initial callback", () => {
      const mockResponse = {
        status: TOKEN_SIDE_EFFECTS.successCondition[1],
      };
      const callback = () => mockResponse;

      test("Then it should not call anything and dispatch to a success status", async () => {
        const { result } = renderHook(useUi);

        expect(result.current.ui.status).toBe("IDLE");

        const callCallback =
          result.current.handleSideEffects(TOKEN_SIDE_EFFECTS);

        let callSuccess: Function;

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
          callSuccess = await callCallback(callback);
        });

        expect(result.current.ui.status).toBe("LOADING");
        expect(result.current.ui.message).toBe(TOKEN_SIDE_EFFECTS.loading);

        await act(async () => {
          await callSuccess();
        });

        expect(result.current.ui.status).toBe("SUCCESS");
        expect(result.current.ui.message).toBe(TOKEN_SIDE_EFFECTS.success);
      });
    });

    describe("And when called both of its returned functions with a callback with error", () => {
      const mockResponse = {
        status: "",
      };
      const callback = () => mockResponse;
      const successCallback = jest.fn();

      test("Then it should update the dispatch to a loading status and then success, not call the success callback and return the response", async () => {
        const { result } = renderHook(useUi);

        expect(result.current.ui.status).toBe("IDLE");

        const callCallback =
          result.current.handleSideEffects(TOKEN_SIDE_EFFECTS);

        let callSuccess: Function;

        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
          callSuccess = await callCallback(callback);
        });

        expect(result.current.ui.status).toBe("LOADING");
        expect(result.current.ui.message).toBe(TOKEN_SIDE_EFFECTS.loading);

        await act(async () => {
          const response = await callSuccess(successCallback);
          expect(response).toStrictEqual(mockResponse);
        });

        expect(successCallback).not.toHaveBeenCalled();
        expect(result.current.ui.status).toBe("ERROR");
        expect(result.current.ui.message).toBe(TOKEN_SIDE_EFFECTS.error);
      });
    });
  });
});
