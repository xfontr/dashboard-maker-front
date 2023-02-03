/* eslint-disable testing-library/no-unnecessary-act */
import { act } from "react-dom/test-utils";
import useSteps from "../../../../common/hooks/useSteps";
import { mockProtoToken } from "../../../../common/test-utils/mocks/mockToken";
import { mockUser, mockProtoUser } from "../../../../common/test-utils/mocks";
import { MOCK_FORCE_ERROR } from "../../../../common/test-utils/mockServer/mockHandlers";
import { MAIN_IDENTIFIER } from "../../../../config/database";
import ENDPOINTS from "../../../../config/endpoints";
import useRegistration from "../useRegistration";
import { ProtoToken } from "../../types/token.types";
import { renderHook } from "../../../../common/test-utils/customRender";
import { useUi } from "../../../../common/store/slices/ui";
import { SIGN_USER_UP_UI, VERIFY_TOKEN_UI } from "../../config/ui.constants";

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
      test("Then it should update the user token, the ui, and call next", async () => {
        const { result } = renderHook(() => ({
          useRegistration: useRegistration(next),
          ui: useUi(),
        }));

        expect(result.current.useRegistration.user).toBeUndefined();
        expect(result.current.useRegistration.token).toBeUndefined();

        expect(result.current.ui.ui.status).toBe("IDLE");

        await act(async () => {
          await result.current.useRegistration.handleTokenSubmit(
            mockProtoToken as ProtoToken
          );
        });

        expect(result.current.useRegistration.token!.code).toBe(
          mockProtoToken.code
        );
        expect(result.current.useRegistration.user![MAIN_IDENTIFIER]).toBe(
          mockProtoToken[MAIN_IDENTIFIER]
        );

        expect(next).toHaveBeenCalled();

        // UI
        expect(result.current.ui.ui.status).toBe("SUCCESS");
        expect(result.current.ui.ui.message).toBe(VERIFY_TOKEN_UI.success);
      });

      test("Then it should do nothing if there's an error while requesting the token", async () => {
        ENDPOINTS.tokens.verify = MOCK_FORCE_ERROR;

        const { result } = renderHook(() => ({
          useRegistration: useRegistration(next),
          ui: useUi(),
        }));

        expect(result.current.ui.ui.status).toBe("IDLE");

        await act(async () => {
          await result.current.useRegistration.handleTokenSubmit(
            mockProtoToken as ProtoToken
          );
        });

        expect(result.current.useRegistration.user).toBeUndefined();
        expect(result.current.useRegistration.token).toBeUndefined();

        expect(next).not.toHaveBeenCalled();

        // UI
        expect(result.current.ui.ui.status).toBe("ERROR");
        expect(result.current.ui.ui.message).toBe(VERIFY_TOKEN_UI.error);
      });
    });

    describe("And when called its returned function handlePasswordSubmit with user values", () => {
      test("Then it should update the user and call next", () => {
        const { result } = renderHook(() => useRegistration(next));

        expect(result.current.user).toBeUndefined();
        expect(result.current.token).toBeUndefined();

        act(() => {
          result.current.handlePasswordSubmit(mockProtoUser);
        });

        expect(result.current.user).toStrictEqual(mockProtoUser);
        expect(next).toHaveBeenCalled();
      });
    });

    describe("And when called its returned function handleSignUpSubmit with user values", () => {
      test("Then it should register the user with the passed values, update the ui and call next", async () => {
        const { result } = renderHook(() => ({
          useRegistration: useRegistration(next),
          ui: useUi(),
        }));

        expect(result.current.useRegistration.user).toBeUndefined();
        expect(result.current.useRegistration.token).toBeUndefined();

        expect(result.current.ui.ui.status).toBe("IDLE");

        await act(async () => {
          await result.current.useRegistration.handleTokenSubmit(
            mockProtoToken as ProtoToken
          );
        });

        await act(async () => {
          await result.current.useRegistration.handleSignUpSubmit(
            mockProtoUser
          );
        });

        expect(result.current.useRegistration.user).toStrictEqual(
          mockProtoUser
        );
        expect(next).toHaveBeenCalledTimes(2);

        // UI
        expect(result.current.ui.ui.status).toBe("SUCCESS");
        expect(result.current.ui.ui.message).toBe(SIGN_USER_UP_UI.success);
      });

      test("Then it should not call next if there's an error while registering the user, and update the ui", async () => {
        ENDPOINTS.users.signUp = MOCK_FORCE_ERROR;

        const { result } = renderHook(() => ({
          useRegistration: useRegistration(next),
          ui: useUi(),
        }));

        expect(result.current.useRegistration.user).toBeUndefined();
        expect(result.current.useRegistration.token).toBeUndefined();

        expect(result.current.ui.ui.status).toBe("IDLE");

        await act(async () => {
          await result.current.useRegistration.handleTokenSubmit(
            mockProtoToken as ProtoToken
          );
        });

        await act(async () => {
          await result.current.useRegistration.handleSignUpSubmit(mockUser);
        });

        expect(result.current.useRegistration.user).toStrictEqual(mockUser);
        expect(next).toHaveBeenCalledTimes(1);

        // UI
        expect(result.current.ui.ui.status).toBe("ERROR");
        expect(result.current.ui.ui.message).toBe(SIGN_USER_UP_UI.error);
      });
    });
  });
});
