import { Action, BaseAction } from "../../../../common/store/types";
import { StoredUser } from "../../types/user.types";

export type UserDataState = StoredUser;

export type UserDataActionTypes = "SET_DATA" | "RESET_DATA";

export type UserDataBaseAction = BaseAction<UserDataActionTypes>;
export type UserDataAction = Action<UserDataActionTypes>;
