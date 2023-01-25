import { Action, BaseAction } from "../../../common/store/types";
import UserRoles from "../../../common/types/UserRoles";
import { MAIN_IDENTIFIER } from "../../../config/database";

export interface UserAuthState {
  [MAIN_IDENTIFIER]: string;
  authToken: string;
  role: UserRoles;
  isLogged: boolean;
}

export type UserAuthActionTypes = "LOG_IN" | "REFRESH_TOKEN";

export type UserAuthBaseAction = BaseAction<UserAuthActionTypes>;
export type UserAuthAction = Action<UserAuthActionTypes>;
