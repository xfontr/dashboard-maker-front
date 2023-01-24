/** REDUCERS */

import { Action } from "../../../../common/store/types";
import { mockUser } from "../../../../common/test-utils/mocks";
import { MAIN_IDENTIFIER } from "../../../../config/database";
import { UserRequiredData } from "../../types/user.types";
import {
  logInActionCreator,
  setRefreshTokenActionCreator,
  userAuthSlice,
} from "../userAuth.slice";
import { UserAuthActionTypes, UserAuthState } from "../userAuth.types";

describe("Given a LOG_IN method", () => {
  describe("When called with a user auth initial state and a payload of authentication data", () => {
    test("Then it should return the initial state updated with the passed authentication state and a logged user", () => {
      const expectedState: UserAuthState = {
        [MAIN_IDENTIFIER]: mockUser[MAIN_IDENTIFIER],
        role: mockUser.role!,
        authToken: mockUser.authToken!,
        isLogged: true,
      };

      const payload: Omit<UserRequiredData, "password"> = {
        [MAIN_IDENTIFIER]: mockUser[MAIN_IDENTIFIER],
        role: mockUser.role!,
        authToken: mockUser.authToken,
      };

      const state = userAuthSlice.reducers.LOG_IN(
        userAuthSlice.initialState,
        payload
      );

      expect(expectedState).toStrictEqual(state);
    });
  });
});

describe("Given a REFRESH_TOKEN method", () => {
  describe("When called with a user auth initial state and a payload of authentication data", () => {
    test("Then it should return the initial state with a new token", () => {
      const payload = "newRefreshToken";

      const expectedState: UserAuthState = {
        ...userAuthSlice.initialState,
        authToken: payload,
      };

      const state = userAuthSlice.reducers.REFRESH_TOKEN(
        userAuthSlice.initialState,
        payload
      );

      expect(expectedState).toStrictEqual(state);
    });
  });
});

/** ACTION CREATORS */

describe("Given a logInActionCreator function", () => {
  describe("When called with authentication data as a payload'", () => {
    test("Then it should return an action with said payload and a type 'LOG_IN'", () => {
      const expectedAction: Action<UserAuthActionTypes> = {
        type: "LOG_IN",
        payload: {
          [MAIN_IDENTIFIER]: mockUser[MAIN_IDENTIFIER],
          role: mockUser.role!,
          authToken: mockUser.authToken,
        },
      };

      const action = logInActionCreator(expectedAction.payload);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});

describe("Given a refreshTokenActionCreator function", () => {
  describe("When called with no payload'", () => {
    test("Then it should return an action with no payload and a type 'REFRESH_TOKEN'", () => {
      const expectedAction: Action<UserAuthActionTypes> = {
        type: "REFRESH_TOKEN",
        payload: mockUser.authToken,
      };

      const action = setRefreshTokenActionCreator(expectedAction.payload);

      expect(action).toStrictEqual(expectedAction);
    });
  });
});
