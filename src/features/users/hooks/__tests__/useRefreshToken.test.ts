import { waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { renderHook } from "../../../../common/test-utils/customRender";
import { mockUser } from "../../../../common/test-utils/mocks";
import {
  MOCK_DYNAMIC_DATA,
  MOCK_FORCE_ERROR,
} from "../../../../common/test-utils/mockServer/mockHandlers";
import { MAIN_IDENTIFIER } from "../../../../config/database";
import ENDPOINTS from "../../../../config/endpoints";
import { logInActionCreator } from "../../store";
import useUserAuth from "../../store/userAuth.hook";
import useRefreshToken from "../useRefreshToken";

jest.mock("../../utils/decodeToken", () => () => mockUser);

describe("Given a useRefreshToken hook", () => {
  describe("When called and there is a token in the cookies", () => {
    test("Then it should log the user in if it's the first try, and refresh the token at the second try", async () => {
      // FIRST TRY

      MOCK_DYNAMIC_DATA.refreshToken = "initialToken";

      const { result } = renderHook(() => ({
        userAuth: useUserAuth(),
        refreshToken: useRefreshToken(),
      }));

      await act(async () => {
        await result.current.refreshToken();
      });

      expect(result.current.userAuth.userAuth.isLogged).toBe(true);
      expect(result.current.userAuth.userAuth[MAIN_IDENTIFIER]).toBe(
        mockUser[MAIN_IDENTIFIER]
      );
      expect(result.current.userAuth.userAuth.role).toBe(mockUser.role);
      expect(result.current.userAuth.userAuth.authToken).toBe("initialToken");

      // SECOND TRY

      MOCK_DYNAMIC_DATA.refreshToken = mockUser.authToken;

      await act(async () => {
        await result.current.refreshToken();
      });

      await waitFor(() => {
        expect(result.current.userAuth.userAuth.authToken).toBe(
          mockUser.authToken
        );
      });
    });

    test("Then it should log the user out if there is an error while getting the token", async () => {
      ENDPOINTS.users.refreshToken = MOCK_FORCE_ERROR;

      const { result } = renderHook(() => ({
        userAuth: useUserAuth(),
        refreshToken: useRefreshToken(),
      }));

      act(() => {
        result.current.userAuth.dispatch(logInActionCreator(mockUser));
      });

      expect(result.current.userAuth.userAuth.isLogged).toBeTruthy();

      await act(async () => {
        await result.current.refreshToken();
      });

      expect(result.current.userAuth.userAuth.isLogged).toBeFalsy();
      expect(result.current.userAuth.userAuth.authToken).toBeFalsy();
    });
  });
});
