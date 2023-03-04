import { act } from "react-dom/test-utils";
import useUserAuth from "../../../features/users/store/userAuthSlice/userAuth.hook";
import { logInActionCreator } from "../../../features/users/store/userAuthSlice/userAuth.slice";
import useUserData from "../../../features/users/store/userDataSlice/userData.hook";
import { setDataActionCreator } from "../../../features/users/store/userDataSlice/userData.slice";
import { renderHook } from "../../test-utils/customRender";
import { mockUser } from "../../test-utils/mocks";
import DataUnit from "../../types/DataUnit";
import useUser from "../useUser";

describe("Given a useUser hook", () => {
  describe("When called its returned function logOut", () => {
    test("Then it should restart both auth and data of the user", () => {
      const { result } = renderHook(() => ({
        auth: useUserAuth(),
        data: useUserData(),
        user: useUser(),
      }));

      act(() => {
        result.current.auth.dispatch(logInActionCreator(mockUser));
        result.current.data.dispatch(setDataActionCreator(mockUser));
      });

      expect(result.current.auth.userAuth.isLogged).toBeTruthy();
      expect(result.current.auth.userAuth.email).toBe(mockUser.email);
      expect(result.current.data.userData.email).toBe(mockUser.email);

      act(() => {
        result.current.user.logOut();
      });

      expect(result.current.auth.userAuth.isLogged).toBeFalsy();
      expect(result.current.data.userData.email).toBe("");
    });
  });

  describe("When called its returned function getUserDataSet with a param 'basic'", () => {
    test("Then it should return all the user fields related to its basic data", () => {
      const expectedUserBasicData: DataUnit[] = [
        {
          heading: "email",
          data: mockUser.email,
        },
        {
          heading: "name",
          data: mockUser.name,
        },
      ];

      const { result } = renderHook(() => ({
        useUser: useUser(),
        useUserAuth: useUserAuth(),
        useUserData: useUserData(),
      }));

      act(() => {
        result.current.useUserAuth.dispatch(logInActionCreator(mockUser));
        result.current.useUserData.dispatch(setDataActionCreator(mockUser));
      });

      const basicUserData = result.current.useUser.getUserDataSet("basic");

      expect(basicUserData).toStrictEqual(expectedUserBasicData);
    });
  });
});
