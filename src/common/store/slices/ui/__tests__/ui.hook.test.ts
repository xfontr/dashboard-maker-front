import { renderHook } from "@testing-library/react";
import useUi from "../ui.hook";
import uiSlice from "../ui.slice";
import * as allUiMethods from "../ui.actions";

describe("Given a useUi hook", () => {
  describe("When called", () => {
    test("Then it should return the ui state, a dispatch and all the ui methdods", () => {
      const {
        result: {
          current: { dispatch, ui, uiMethods },
        },
      } = renderHook(useUi);

      expect(ui).toStrictEqual(uiSlice.initialState);
      expect(uiMethods).toStrictEqual(allUiMethods);
      expect(dispatch).not.toBeNull();
    });
  });
});
