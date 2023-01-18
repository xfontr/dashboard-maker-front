import { createContext } from "react";
import {
  MockActionTypes,
  mockProtoSlice,
  mockSlice,
  mockState,
} from "../../test-utils/mocks/mockSlice";
import { Action } from "../types";
import ComposeSlice, { SetReducer, reducer, SetContext } from "./ComposeSlice";

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

        const result = reducer(mockProtoSlice.methods)(mockState, mockAction);

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

        const result = reducer(mockProtoSlice.methods)(mockState, mockAction);

        expect(result).toStrictEqual(expectedResult);
      });
    });
  });
});

describe("Given a SetReducer function", () => {
  describe("When called with slice methods", () => {
    test("Then it should return a reducer object with a reducer function", () => {
      const expectedReducer = JSON.stringify({
        reducer: reducer(mockProtoSlice.methods),
      });

      const result = JSON.stringify(SetReducer(mockProtoSlice.methods));

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

describe("Given a ComposeSlice function", () => {
  describe("When called with a slice", () => {
    test("Then it should return said slice with its contexts and reducers", () => {
      const expectedSlice = {
        ...mockSlice,
        ...SetContext(mockProtoSlice),
        ...SetReducer(mockProtoSlice.methods),
      };

      const returnedSlice = ComposeSlice(mockProtoSlice);

      Object.entries(expectedSlice).forEach(([key, value]) => {
        expect(returnedSlice).toHaveProperty(key);
        expect(
          returnedSlice[key as keyof typeof returnedSlice]?.toString()
        ).toStrictEqual(value?.toString());
      });
    });
  });
});
