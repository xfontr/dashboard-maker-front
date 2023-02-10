import { VERIFY_TOKEN_UI } from "../../../features/users/config/ui.constants";
import { useUi } from "../../store/slices/ui";
import { renderHook } from "../../test-utils/customRender";
import useQuery from "../useQuery";
import IResponse from "../../types/IResponse";
import { act, waitFor } from "@testing-library/react";

const status = 200;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a useQuery hook", () => {
  describe("When called with ui side effects options", () => {
    describe("and called its returned function, if it returns a success status", () => {
      const mockResponse = {
        status,
      };
      const callback = () => mockResponse;

      test("Then it should update the dispatch to a loading status and then success, and return the response", async () => {
        const { result } = renderHook(() => ({
          query: useQuery({ options: VERIFY_TOKEN_UI }),
          ui: useUi(),
        }));

        expect(result.current.ui.ui.status).toBe("IDLE");

        const callCallback = result.current.query(
          callback as unknown as (
            values?: unknown
          ) => Promise<IResponse<unknown>>
        );

        // Verify the UI changes

        act(() => {
          callCallback();
        });

        expect(result.current.ui.ui.status).toBe("LOADING");
        expect(result.current.ui.ui.message).toBe(VERIFY_TOKEN_UI.loading);

        await waitFor(() => {
          expect(result.current.ui.ui.status).toBe("SUCCESS");
        });

        expect(result.current.ui.ui.message).toBe(VERIFY_TOKEN_UI.success);

        // Verify the returned value

        await act(async () => {
          const response = await callCallback(callback);
          expect(response).toStrictEqual(mockResponse);
        });
      });
    });

    describe("and called its returned function, if it returns an error status", () => {
      const mockResponse = {
        status: "",
      };
      const callback = () => mockResponse;

      test("Then it should update the dispatch to a loading status and then error and return the response", async () => {
        const { result } = renderHook(() => ({
          query: useQuery({ options: VERIFY_TOKEN_UI }),
          ui: useUi(),
        }));

        // Verify the UI changes

        expect(result.current.ui.ui.status).toBe("IDLE");

        const callCallback = result.current.query(
          callback as unknown as (
            values?: unknown
          ) => Promise<IResponse<unknown>>
        );

        act(() => {
          callCallback();
        });

        expect(result.current.ui.ui.status).toBe("LOADING");
        expect(result.current.ui.ui.message).toBe(VERIFY_TOKEN_UI.loading);

        await waitFor(() => {
          expect(result.current.ui.ui.status).toBe("ERROR");
        });

        expect(result.current.ui.ui.message).toBe(VERIFY_TOKEN_UI.error);

        // Verify the returned value

        await act(async () => {
          const response = await callCallback();
          expect(response).toStrictEqual(mockResponse);
        });
      });
    });
  });

  describe("When called with custom side effect functions", () => {
    const mockResponse = {
      body: "The body before the custom callback updates it",
      status: 200,
    };

    describe("and called its returned function, if it returns a success status", () => {
      const onSuccessCallback = (
        response: IResponse<unknown>,
        values: unknown
      ) => ({
        ...response,
        body: values,
      });

      const onErrorCallback = jest.fn();

      const onInitCallback = jest.fn();

      const callback = () => mockResponse;

      test("Then it should return the custom success function returned value", async () => {
        const expectedResponse = {
          status: mockResponse.status,
          body: "This is the body of the response after the success function modifies it",
        };

        const { result } = renderHook(() => ({
          query: useQuery({
            options: VERIFY_TOKEN_UI,
            onInit: onInitCallback,
            onSuccess: onSuccessCallback,
            onError: onErrorCallback,
          }),
          ui: useUi(),
        }));

        await act(async () => {
          const response = await result.current.query(
            callback as unknown as (
              values?: unknown
            ) => Promise<IResponse<unknown>>
          )(expectedResponse.body);

          expect(response).toStrictEqual(expectedResponse);
        });

        expect(onInitCallback).toHaveBeenCalledTimes(1);
        expect(onErrorCallback).not.toHaveBeenCalled();
      });
    });

    describe("and called its returned function, if it returns an error status", () => {
      const mockResponse = {
        body: "The body before the custom callback updates it",
        status: "",
      };

      const onSuccessCallback = jest.fn();

      const onErrorCallback = (response: IResponse<unknown>) => ({
        ...response,
        body: "This is the body of the response after the error function modifies it",
      });

      const onInitCallback = jest.fn();

      const callback = () => mockResponse;

      test("Then it should return the custom error function returned value", async () => {
        const expectedResponse = {
          status: mockResponse.status,
          body: onErrorCallback(mockResponse as unknown as IResponse<unknown>)
            .body,
        };

        const { result } = renderHook(() => ({
          query: useQuery({
            options: VERIFY_TOKEN_UI,
            onInit: onInitCallback,
            onSuccess: onSuccessCallback,
            onError: onErrorCallback,
          }),
          ui: useUi(),
        }));

        await act(async () => {
          const response = await result.current.query(
            callback as unknown as (
              values?: unknown
            ) => Promise<IResponse<unknown>>
          )(expectedResponse.body);

          expect(response).toStrictEqual(expectedResponse);
        });

        expect(onInitCallback).toHaveBeenCalledTimes(1);
        expect(onSuccessCallback).not.toHaveBeenCalled();
      });
    });
  });

  describe("When called with no ui side effects options", () => {
    describe("and called its returned function, if it returns a success status", () => {
      const mockResponse = {
        status,
      };
      const callback = () => mockResponse;

      test("Then it should keep the ui with 'IDLE' status", async () => {
        const { result } = renderHook(() => ({
          query: useQuery({}),
          ui: useUi(),
        }));

        expect(result.current.ui.ui.status).toBe("IDLE");

        const callCallback = result.current.query(
          callback as unknown as (
            values?: unknown
          ) => Promise<IResponse<unknown>>
        );

        act(() => {
          callCallback();
        });

        expect(result.current.ui.ui.status).toBe("IDLE");

        await waitFor(() => {
          expect(result.current.ui.ui.status).toBe("IDLE");
        });
      });
    });

    describe("and called its returned function, if it returns an error status", () => {
      const mockResponse = {
        status: "",
      };
      const callback = () => mockResponse;

      test("Then it should keep the ui with 'IDLE' status", async () => {
        const { result } = renderHook(() => ({
          query: useQuery({}),
          ui: useUi(),
        }));

        expect(result.current.ui.ui.status).toBe("IDLE");

        const callCallback = result.current.query(
          callback as unknown as (
            values?: unknown
          ) => Promise<IResponse<unknown>>
        );

        act(() => {
          callCallback();
        });

        expect(result.current.ui.ui.status).toBe("IDLE");

        await waitFor(() => {
          expect(result.current.ui.ui.status).toBe("IDLE");
        });
      });
    });
  });
});
