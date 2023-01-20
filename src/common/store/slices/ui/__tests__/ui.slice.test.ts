import { Action } from "../../../types";
import {
  setErrorActionCreator,
  setIdleActionCreator,
  setLoadingActionCreator,
  setSuccessActionCreator,
  uiSlice,
} from "../ui.slice";
import { UIActionTypes, UIState } from "../ui.types";

/** REDUCERS */

describe("Given a SET_ERROR method", () => {
  describe("When called with a UI initial state and a payload of 'Test'", () => {
    test("Then it should update the initial state to have an error with said payload", () => {
      const expectedState: UIState = {
        status: "ERROR",
        message: "Test",
      };

      const state = uiSlice.reducers.SET_ERROR(
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

      const state = uiSlice.reducers.SET_SUCCESS(
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

      const state = uiSlice.reducers.SET_LOADING(
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

      const state = uiSlice.reducers.SET_IDLE(uiSlice.initialState);

      expect(expectedState).toStrictEqual(state);
    });
  });
});

/** ACTION CREATORS */

describe("Given a setErrorActionCreator function", () => {
  describe("When called with no payload'", () => {
    test("Then it should return an action with no payload and a type 'SET_ERROR'", () => {
      const expectedAction: Action<UIActionTypes> = {
        type: "SET_ERROR",
      };

      const action = setErrorActionCreator();

      expect(action).toStrictEqual(expectedAction);
    });
  });

  describe("When called with a payload 'Test'", () => {
    test("Then it should return an action with said payload and and a type 'SET_ERROR'", () => {
      const expectedAction: Action<UIActionTypes> = {
        type: "SET_ERROR",
        payload: "Test",
      };

      const action = setErrorActionCreator(expectedAction.payload);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a setSuccessActionCreator function", () => {
  describe("When called with no payload'", () => {
    test("Then it should return an action with no payload and a type 'SET_SUCCESS'", () => {
      const expectedAction: Action<UIActionTypes> = {
        type: "SET_SUCCESS",
      };

      const action = setSuccessActionCreator();

      expect(action).toStrictEqual(expectedAction);
    });
  });

  describe("When called with a payload 'Test'", () => {
    test("Then it should return an action with said payload and and a type 'SET_SUCCESS'", () => {
      const expectedAction: Action<UIActionTypes> = {
        type: "SET_SUCCESS",
        payload: "Test",
      };

      const action = setSuccessActionCreator(expectedAction.payload);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a setLoadingActionCreator function", () => {
  describe("When called with no payload'", () => {
    test("Then it should return an action with no payload and a type 'SET_LOADING'", () => {
      const expectedAction: Action<UIActionTypes> = {
        type: "SET_LOADING",
      };

      const action = setLoadingActionCreator();

      expect(action).toStrictEqual(expectedAction);
    });
  });

  describe("When called with a payload 'Test'", () => {
    test("Then it should return an action with said payload and and a type 'SET_LOADING'", () => {
      const expectedAction: Action<UIActionTypes> = {
        type: "SET_LOADING",
        payload: "Test",
      };

      const action = setLoadingActionCreator(expectedAction.payload);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a setIdleActionCreator function", () => {
  describe("When called with no payload", () => {
    test("Then it should return an undefined payload and an action with a type 'SET_IDLE'", () => {
      const expectedAction: Action<UIActionTypes> = {
        type: "SET_IDLE",
      };

      const action = setIdleActionCreator();

      expect(action).toStrictEqual(expectedAction);
    });
  });
});
