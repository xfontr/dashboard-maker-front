import { renderHook } from "../../../../../common/test-utils/customRender";
import useUserData from "../userData.hook";
import { userDataSlice } from "../userData.slice";

describe("Given a useUserData hook", () => {
  describe("When called", () => {
    test("Then it should return the userAuth state and a dispatcher", () => {
      const {
        result: {
          current: { dispatch, userData },
        },
      } = renderHook(useUserData);

      expect(userData).toStrictEqual(userDataSlice.initialState);
      expect(dispatch).not.toBeNull();
    });
  });
});
