import { ProtoSlice, Slice } from "../../../common/store/types";
import createSlice from "../../../common/store/utils/createSlice";
import { MAIN_IDENTIFIER } from "../../../config/database";
import { UserRequiredData } from "../types/user.types";
import { UserAuthActionTypes, UserAuthState } from "./userAuth.types";

const initialState: UserAuthState = {
  [MAIN_IDENTIFIER]: "",
  role: "notLogged",
  authToken: "",
  isLogged: false,
};

const protoUserAuthSlice: ProtoSlice<UserAuthActionTypes, UserAuthState> = {
  name: "userAuth",

  initialState,

  reducers: {
    LOG_IN: (state, payload: UserRequiredData) => ({
      ...state,
      ...payload,
      isLogged: true,
    }),

    LOG_OUT: () => initialState,

    REFRESH_TOKEN: (state, payload: string) => ({
      ...state,
      authToken: payload,
    }),
  },
};

export const userAuthSlice: Slice<UserAuthActionTypes, UserAuthState> =
  createSlice(protoUserAuthSlice);

export const logInActionCreator =
  userAuthSlice.actions.LOG_IN<Omit<UserRequiredData, "password">>();

export const setRefreshTokenActionCreator =
  userAuthSlice.actions.REFRESH_TOKEN<string>();

export const logOutActionCreator = userAuthSlice.actions.LOG_OUT<undefined>();
