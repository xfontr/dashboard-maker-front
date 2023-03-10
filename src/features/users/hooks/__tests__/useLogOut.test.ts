import { act } from "react-dom/test-utils";
import { renderHook } from "../../../../common/test-utils/customRender";
import { mockUser } from "../../../../common/test-utils/mocks";
import { MOCK_FORCE_ERROR } from "../../../../common/test-utils/mockServer/mockHandlers";
import ENDPOINTS from "../../../../config/endpoints";
import { logInActionCreator } from "../../store";
import useUserAuth from "../../store/userAuth.hook";
import useLogOut from "../useLogOut";

describe("Given a logOut hook", () => {
  describe("When called its returned function", () => {
    test("Then it should log the user out and update the database", async () => {
      const expectedResponse = {
        body: { logOut: "User logged out" },
        status: 200,
      };

      const { result } = renderHook(() => ({
        logOut: useLogOut(),
        userAuth: useUserAuth(),
      }));

      act(() => {
        result.current.userAuth.dispatch(logInActionCreator(mockUser));
      });

      expect(result.current.userAuth.userAuth.isLogged).toBeTruthy();

      await act(async () => {
        const response = await result.current.logOut();
        expect(response).toStrictEqual(expectedResponse);
      });

      expect(result.current.userAuth.userAuth.isLogged).toBeFalsy();
    });

    test("Then it should log the user out even if the database update goes wrong", async () => {
      ENDPOINTS.users.logOut = MOCK_FORCE_ERROR;

      const { result } = renderHook(() => ({
        logOut: useLogOut(),
        userAuth: useUserAuth(),
      }));

      act(() => {
        result.current.userAuth.dispatch(logInActionCreator(mockUser));
      });

      expect(result.current.userAuth.userAuth.isLogged).toBeTruthy();

      await act(async () => {
        const response = await result.current.logOut();
        expect(response.status).toBe(400);
      });

      expect(result.current.userAuth.userAuth.isLogged).toBeFalsy();
    });
  });
});
