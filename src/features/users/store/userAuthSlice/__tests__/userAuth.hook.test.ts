import { renderHook } from "../../../../../common/test-utils/customRender";
import useUserAuth from "../userAuth.hook";
import { userAuthSlice } from "../userAuth.slice";

describe("Given a useUserAuth hook", () => {
  describe("When called", () => {
    test("Then it should return the userAuth state and a dispatcher", () => {
      const {
        result: {
          current: { dispatch, userAuth },
        },
      } = renderHook(useUserAuth);

      expect(userAuth).toStrictEqual(userAuthSlice.initialState);
      expect(dispatch).not.toBeNull();
    });
  });
});
