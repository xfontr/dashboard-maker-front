import { ProtoSlice, Slice } from "../../../../common/store/types";
import createSlice from "../../../../common/store/utils/createSlice";
import IUser from "../../types/user.types";
import { UserDataActionTypes, UserDataState } from "./userData.types";

const initialState: UserDataState = {
  email: "",
};

const protoUserDataSlice: ProtoSlice<UserDataActionTypes, UserDataState> = {
  name: "userData",

  initialState,

  reducers: {
    RESET_DATA: () => initialState,

    SET_DATA: (_, payload: IUser): IUser => ({
      ...payload,
    }),
  },
};

export const userDataSlice: Slice<UserDataActionTypes, UserDataState> =
  createSlice(protoUserDataSlice);

export const setDataActionCreator =
  userDataSlice.actions.SET_DATA<Omit<IUser, "password">>();

export const resetDataActionCreator =
  userDataSlice.actions.RESET_DATA<undefined>();

