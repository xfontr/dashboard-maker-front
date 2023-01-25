import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useUi } from "../../../../common/store/slices/ui";
import { renderHook } from "../../../../common/test-utils/customRender";
import { mockUser } from "../../../../common/test-utils/mocks";
import { FORCE_ERROR } from "../../../../common/test-utils/mockServer/mockHandlers";
import { MAIN_IDENTIFIER } from "../../../../config/database";
import ENDPOINTS from "../../../../config/endpoints";
import { LOG_IN_UI } from "../../config/ui.constants";
import { userAuthSlice } from "../../store";
import useUserAuth from "../../store/userAuth.hook";
import useLogIn from "../useLogIn";

jest.mock("../../utils/decodeToken", () => () => mockUser);

describe("Given a useLogin hook", () => {
  describe("When called its returned function with login values", () => {
    test("If the login goes right, it should log the user in while updating the ui", async () => {
      const expectedLoggedUser = {
        [MAIN_IDENTIFIER]: mockUser[MAIN_IDENTIFIER],
        role: mockUser.role,
        authToken: mockUser.authToken,
        isLogged: true,
      };

      const { result } = renderHook(() => ({
        logIn: useLogIn(),
        ui: useUi(),
        auth: useUserAuth(),
      }));

      expect(result.current.ui.ui.status).toBe("IDLE");

      await act(async () => {
        await result.current.logIn(mockUser);
      });

      expect(result.current.ui.ui.status).toBe("LOADING");
      expect(result.current.ui.ui.message).toBe(LOG_IN_UI.loading);

      expect(result.current.auth.userAuth).toStrictEqual(expectedLoggedUser);

      await waitFor(() => {
        expect(result.current.ui.ui.status).toBe("IDLE"); // As there is no success option for the log in ui options
      });
    });

    test("If the login goes wrong, it should not log the user and update the ui", async () => {
      ENDPOINTS.users.logIn = FORCE_ERROR;

      const { result } = renderHook(() => ({
        logIn: useLogIn(),
        ui: useUi(),
        auth: useUserAuth(),
      }));

      expect(result.current.ui.ui.status).toBe("IDLE");

      await act(async () => {
        await result.current.logIn(mockUser);
      });

      expect(result.current.ui.ui.status).toBe("ERROR");
      expect(result.current.ui.ui.message).toBe(LOG_IN_UI.error);

      expect(result.current.auth.userAuth).toStrictEqual(
        userAuthSlice.initialState
      );
    });
  });

  describe("When called its returned function with no login values", () => {
    test("Then it should not log the user in and update the ui", async () => {
      const { result } = renderHook(() => ({
        logIn: useLogIn(),
        ui: useUi(),
        auth: useUserAuth(),
      }));

      expect(result.current.ui.ui.status).toBe("IDLE");

      await act(async () => {
        await result.current.logIn();
      });

      expect(result.current.ui.ui.status).toBe("ERROR");
      expect(result.current.ui.ui.message).toBe(LOG_IN_UI.error);

      expect(result.current.auth.userAuth).toStrictEqual(
        userAuthSlice.initialState
      );
    });
  });
});
