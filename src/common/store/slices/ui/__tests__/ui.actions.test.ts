import { Action } from "../../../types";
import {
  setErrorActionCreator,
  setIdleActionCreator,
  setLoadingActionCreator,
  setSuccessActionCreator,
} from "../ui.actions";
import { UIActionTypes } from "../ui.types";

describe("Given a setErrorActionCreator function", () => {
  describe("When called with no payload'", () => {
    test("Then it should return an action with a default payload and a type 'SET_ERROR'", () => {
      const expectedAction: Action<UIActionTypes> = {
        type: "SET_ERROR",
        payload: "Something went wrong",
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
    test("Then it should return an action with a default payload and a type 'SET_SUCCESS'", () => {
      const expectedAction: Action<UIActionTypes> = {
        type: "SET_SUCCESS",
        payload: "Success",
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
    test("Then it should return an action with a default payload and a type 'SET_LOADING'", () => {
      const expectedAction: Action<UIActionTypes> = {
        type: "SET_LOADING",
        payload: "Loading...",
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
  describe("When called", () => {
    test("Then it should return an action with a type 'SET_IDLE'", () => {
      const expectedAction: Action<UIActionTypes> = {
        type: "SET_IDLE",
      };

      const action = setIdleActionCreator();

      expect(action).toStrictEqual(expectedAction);
    });
  });
});
