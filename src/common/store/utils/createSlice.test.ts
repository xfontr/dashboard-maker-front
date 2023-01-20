import { createContext } from "react";
import {
  MockActionTypes,
  mockProtoSlice,
  mockSlice,
  mockState,
} from "../../test-utils/mocks/mockSlice";
import { Action } from "../types";
import createSlice, {
  SetReducer,
  reducer,
  SetContext,
  SetActions,
} from "./createSlice";

describe("Given a reducer function", () => {
  describe("When called with a slice methods", () => {
    describe("And called its returned function with a state and a valid action", () => {
      test("Then it should return the returned value by the corresponding method", () => {
        const mockAction: Action<MockActionTypes> = {
          type: "TEST",
          payload: "New name",
        };

        const expectedResult: typeof mockState = {
          ...mockState,
          name: "New name",
        };

        const result = reducer(mockProtoSlice.reducers)(mockState, mockAction);

        expect(result).toStrictEqual(expectedResult);
      });
    });

    describe("And called its returned function with a state and an invalid action", () => {
      test("Then it should return the same original state", () => {
        const mockAction = {
          type: "RANDOM",
          payload: "New name",
        } as unknown as Action<MockActionTypes>;

        const expectedResult: typeof mockState = {
          ...mockState,
        };

        const result = reducer(mockProtoSlice.reducers)(mockState, mockAction);

        expect(result).toStrictEqual(expectedResult);
      });
    });
  });
});

describe("Given a SetReducer function", () => {
  describe("When called with slice methods", () => {
    test("Then it should return a reducer object with a reducer function", () => {
      const expectedReducer = JSON.stringify({
        reducer: reducer(mockProtoSlice.reducers),
      });

      const result = JSON.stringify(SetReducer(mockProtoSlice.reducers));

      expect(result).toStrictEqual(expectedReducer);
    });
  });
});

describe("Given a SetContext function", () => {
  describe("When called with a slice", () => {
    test("Then it should return a Context with the slice and a dispatcher", () => {
      const expectedResult = {
        Context: createContext({
          [mockProtoSlice.name]: mockProtoSlice.initialState,
          dispatch: () => {},
        }),
      };

      const result = SetContext(mockProtoSlice);

      Object.entries(expectedResult.Context).forEach(([key, value]) => {
        expect(result.Context).toHaveProperty(key);
        expect(
          result.Context[key as keyof typeof result.Context]?.toString()
        ).toStrictEqual(value?.toString());
      });
    });
  });
});

describe("Given a SetActions function", () => {
  describe("When called with all slice reducers", () => {
    test("Then it should return all the functioning slice action creators", () => {
      const expectedAction: Action<MockActionTypes> = {
        type: "TEST",
        payload: "Test",
      };

      const actions = SetActions(mockProtoSlice.reducers);

      expect(actions.actions.TEST).not.toBeNull();
      expect(actions.actions.TEST_2).not.toBeNull();

      const actionTest = actions.actions.TEST<string>()("Test");

      expect(actionTest).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a createSlice function", () => {
  describe("When called with a slice", () => {
    test("Then it should return said slice with its contexts and reducers", () => {
      const expectedSlice = {
        ...mockSlice,
        ...SetContext(mockProtoSlice),
        ...SetReducer(mockProtoSlice.reducers),
        ...SetActions(mockProtoSlice.reducers),
      };

      const returnedSlice = createSlice(mockProtoSlice);

      Object.entries(expectedSlice).forEach(([key, value]) => {
        expect(returnedSlice).toHaveProperty(key);
        expect(
          returnedSlice[key as keyof typeof returnedSlice]?.toString()
        ).toStrictEqual(value?.toString());
      });
    });
  });
});
