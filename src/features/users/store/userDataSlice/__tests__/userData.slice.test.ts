import { Action } from "../../../../../common/store/types";
import { mockUser } from "../../../../../common/test-utils/mocks";
import { MAIN_IDENTIFIER } from "../../../../../config/database";
import { UserAuthState } from "../../userAuthSlice/userAuth.types";
import {
  resetDataActionCreator,
  setDataActionCreator,
  userDataSlice,
} from "../userData.slice";
import { UserDataActionTypes, UserDataState } from "../userData.types";

describe("Given a SET_DATA method", () => {
  describe("When called with a user auth initial state and a payload of a user", () => {
    test("Then it should return the initial state updated with the passed user", () => {
      const expectedState: UserDataState = { ...mockUser };

      const payload = { ...mockUser };

      const state = userDataSlice.reducers.SET_DATA(
        userDataSlice.initialState,
        payload
      );

      expect(expectedState).toStrictEqual(state);
    });
  });
});

describe("Given a RESET_DATA method", () => {
  describe("When called", () => {
    test("Then it should return the initial state", () => {
      const expectedState = userDataSlice.initialState;

      const state = userDataSlice.reducers.RESET_DATA(
        userDataSlice.initialState
      );

      expect(expectedState).toStrictEqual(state);
    });
  });
});

/** ACTION CREATORS */

describe("Given a setDataActionCreator function", () => {
  describe("When called with a user as payload'", () => {
    test("Then it should return an action with said payload and a type 'SET_DATA'", () => {
      const expectedAction: Action<UserDataActionTypes> = {
        type: "SET_DATA",
        payload: mockUser,
      };

      const action = setDataActionCreator(expectedAction.payload);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a restartDataActionCreator function", () => {
  describe("When called with no payload'", () => {
    test("Then it should return an action with no payload and a type 'RESET_DATA'", () => {
      const expectedAction: Action<UserDataActionTypes> = {
        type: "RESET_DATA",
      };

      const action = resetDataActionCreator(expectedAction.payload);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});
