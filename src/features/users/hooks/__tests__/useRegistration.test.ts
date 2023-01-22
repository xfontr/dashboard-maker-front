/* eslint-disable testing-library/no-unnecessary-act */
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useSteps from "../../../../common/hooks/useSteps";
import { mockProtoToken } from "../../../../common/test-utils/mocks/mockToken";
import { mockUser, mockProtoUser } from "../../../../common/test-utils/mocks";
import { FORCE_ERROR } from "../../../../common/test-utils/mockServer/mockHandlers";
import { MAIN_IDENTIFIER } from "../../../../config/database";
import ENDPOINTS from "../../../../config/endpoints";
import useRegistration from "../useRegistration";

const originalEndpoints = {
  tokens: { ...ENDPOINTS.tokens },
  users: { ...ENDPOINTS.users },
};

beforeEach(() => {
  ENDPOINTS.tokens.verify = originalEndpoints.tokens.verify;
  ENDPOINTS.users.signUp = originalEndpoints.users.signUp;
  jest.clearAllMocks();
});

describe("Given a useRegistration hook", () => {
  describe("When called with a next function", () => {
    const next = jest.fn() as ReturnType<typeof useSteps>["next"];

    describe("And when called its returned function handleTokenSubmit with token values", () => {
      test("Then it should update the user token and call next", async () => {
        const { result, rerender } = renderHook(useRegistration, {
          initialProps: next,
        });

        expect(result.current.user).toBeUndefined();
        expect(result.current.token).toBeUndefined();

        await act(async () => {
          await result.current.handleTokenSubmit(
            mockProtoToken as Record<string, string>
          );

          rerender();
        });

        expect(result.current.token!.code).toBe(mockProtoToken.code);
        expect(result.current.user![MAIN_IDENTIFIER]).toBe(
          mockProtoToken[MAIN_IDENTIFIER]
        );

        expect(next).toHaveBeenCalled();
      });

      test("Then it should do nothing if there's an error while requesting the token", async () => {
        ENDPOINTS.tokens.verify = FORCE_ERROR;

        const { result, rerender } = renderHook(useRegistration, {
          initialProps: next,
        });

        await act(async () => {
          await result.current.handleTokenSubmit(
            mockProtoToken as Record<string, string>
          );

          rerender();
        });

        expect(result.current.user).toBeUndefined();
        expect(result.current.token).toBeUndefined();

        expect(next).not.toHaveBeenCalled();
      });
    });

    describe("And when called its returned function handlePasswordSubmit with user values", () => {
      test("Then it should update the user and call next", () => {
        const { result, rerender } = renderHook(useRegistration, {
          initialProps: next,
        });

        expect(result.current.user).toBeUndefined();
        expect(result.current.token).toBeUndefined();

        act(() => {
          result.current.handlePasswordSubmit(
            mockProtoUser as unknown as Record<string, string>
          );

          rerender();
        });

        expect(result.current.user).toStrictEqual(mockProtoUser);
        expect(next).toHaveBeenCalled();
      });
    });

    describe("And when called its returned function handleSignUpSubmit with user values", () => {
      test("Then it should update the user token and call next", async () => {
        const { result, rerender } = renderHook(useRegistration, {
          initialProps: next,
        });

        expect(result.current.user).toBeUndefined();
        expect(result.current.token).toBeUndefined();

        await act(async () => {
          await result.current.handleTokenSubmit(
            mockProtoToken as Record<string, string>
          );
        });

        await act(async () => {
          await result.current.handleSignUpSubmit(
            mockProtoUser as unknown as Record<string, string>
          );

          rerender();
        });

        expect(result.current.user).toStrictEqual(mockProtoUser);
        expect(next).toHaveBeenCalledTimes(2);
      });

      test("Then it should not call next if there's an error while requesting the token", async () => {
        ENDPOINTS.users.signUp = FORCE_ERROR;

        const { result, rerender } = renderHook(useRegistration, {
          initialProps: next,
        });

        expect(result.current.user).toBeUndefined();
        expect(result.current.token).toBeUndefined();

        await act(async () => {
          await result.current.handleTokenSubmit(
            mockProtoToken as Record<string, string>
          );
        });

        await act(async () => {
          await result.current.handleSignUpSubmit(
            mockUser as unknown as Record<string, string>
          );

          rerender();
        });

        expect(result.current.user).toStrictEqual(mockUser);
        expect(next).toHaveBeenCalledTimes(1);
      });
    });
  });
});
