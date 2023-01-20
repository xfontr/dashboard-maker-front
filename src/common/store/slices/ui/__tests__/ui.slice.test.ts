import uiSlice from "../ui.slice";
import { UIState } from "../ui.types";

describe("Given a SET_ERROR method", () => {
  describe("When called with a UI initial state and a payload of 'Test'", () => {
    test("Then it should update the initial state to have an error with said payload", () => {
      const expectedState: UIState = {
        status: "ERROR",
        message: "Test",
      };

      const state = uiSlice.methods.SET_ERROR(
        uiSlice.initialState,
        expectedState.message
      );

      expect(expectedState).toStrictEqual(state);
    });
  });
});

describe("Given a SET_SUCCESS method", () => {
  describe("When called with a UI initial state and a payload of 'Test'", () => {
    test("Then it should update the initial state to be of success with said payload", () => {
      const expectedState: UIState = {
        status: "SUCCESS",
        message: "Test",
      };

      const state = uiSlice.methods.SET_SUCCESS(
        uiSlice.initialState,
        expectedState.message
      );

      expect(expectedState).toStrictEqual(state);
    });
  });
});

describe("Given a SET_LOADING method", () => {
  describe("When called with a UI initial state and a payload of 'Test'", () => {
    test("Then it should update the initial state to be of loading with said payload", () => {
      const expectedState: UIState = {
        status: "LOADING",
        message: "Test",
      };

      const state = uiSlice.methods.SET_LOADING(
        uiSlice.initialState,
        expectedState.message
      );

      expect(expectedState).toStrictEqual(state);
    });
  });
});

describe("Given a SET_IDLE method", () => {
  describe("When called with a UI initial state and no payload", () => {
    test("Then it should update the initial state to be of idle, with an empty message", () => {
      const expectedState: UIState = {
        status: "IDLE",
        message: "",
      };

      const state = uiSlice.methods.SET_IDLE(uiSlice.initialState);

      expect(expectedState).toStrictEqual(state);
    });
  });
});
