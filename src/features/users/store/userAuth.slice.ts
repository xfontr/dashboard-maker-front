import { ProtoSlice, Slice } from "../../../common/store/types";
import createSlice from "../../../common/store/utils/createSlice";
import { MAIN_IDENTIFIER } from "../../../config/database";
import { UserRequiredData } from "../types/user.types";
import { UserAuthActionTypes, UserAuthState } from "./userAuth.types";

const protoUserAuthSlice: ProtoSlice<UserAuthActionTypes, UserAuthState> = {
  name: "userAuth",

  initialState: {
    [MAIN_IDENTIFIER]: "",
    role: "notLogged",
    authToken: "",
    isLogged: false,
  },

  reducers: {
    // TODO: This could lead to problems because the payload could be an object with only a token or a role or something (incomplete) and would set the islogged to true anyways
    LOG_IN: (state, payload: UserRequiredData) => ({
      ...state,
      ...payload,
      isLogged: true,
    }),
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
