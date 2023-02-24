import { Action } from "../../../../../common/store/types";
import { mockUser } from "../../../../../common/test-utils/mocks";
import { MAIN_IDENTIFIER } from "../../../../../config/database";
import { UserAuthState } from "../../userAuthSlice/userAuth.types";
import { userDataSlice } from "../userData.slice";
import { UserDataState } from "../userData.types";

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

// describe("Given a logInActionCreator function", () => {
//   describe("When called with authentication data as a payload'", () => {
//     test("Then it should return an action with said payload and a type 'LOG_IN'", () => {
//       const expectedAction: Action<UserAuthActionTypes> = {
//         type: "LOG_IN",
//         payload: {
//           [MAIN_IDENTIFIER]: mockUser[MAIN_IDENTIFIER],
//           role: mockUser.role!,
//           authToken: mockUser.authToken,
//         },
//       };

//       const action = logInActionCreator(expectedAction.payload);

//       expect(action).toStrictEqual(expectedAction);
//     });
//   });
// });

// describe("Given a refreshTokenActionCreator function", () => {
//   describe("When called with no payload'", () => {
//     test("Then it should return an action with no payload and a type 'REFRESH_TOKEN'", () => {
//       const expectedAction: Action<UserAuthActionTypes> = {
//         type: "REFRESH_TOKEN",
//         payload: mockUser.authToken,
//       };

//       const action = setRefreshTokenActionCreator(expectedAction.payload);

//       expect(action).toStrictEqual(expectedAction);
//     });
//   });
// });
