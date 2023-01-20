import { renderHook } from "@testing-library/react";
import useUi from "../ui.hook";
import { uiSlice } from "../ui.slice";

describe("Given a useUi hook", () => {
  describe("When called", () => {
    test("Then it should return the ui state and a dispatche", () => {
      const {
        result: {
          current: { dispatch, ui },
        },
      } = renderHook(useUi);

      expect(ui).toStrictEqual(uiSlice.initialState);
      expect(dispatch).not.toBeNull();
    });
  });
});
