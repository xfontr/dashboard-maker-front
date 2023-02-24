import { Action, BaseAction } from "../../../../common/store/types";
import IUser from "../../types/user.types";

export type UserDataState = Omit<IUser, "password">;

export type UserDataActionTypes = "SET_DATA" | "RESET_DATA";

export type UserDataBaseAction = BaseAction<UserDataActionTypes>;
export type UserDataAction = Action<UserDataActionTypes>;
