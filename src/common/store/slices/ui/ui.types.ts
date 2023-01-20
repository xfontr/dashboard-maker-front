import IResponse from "../../../types/IResponse";
import { Action, BaseAction } from "../../types/actions.types";

export type UIState = {
  status: "IDLE" | "LOADING" | "ERROR" | "SUCCESS";
  message: string;
};

export type UIActionTypes =
  | "SET_ERROR"
  | "SET_SUCCESS"
  | "SET_IDLE"
  | "SET_LOADING";

export type UIBaseAction = BaseAction<UIActionTypes>;
export type UIAction = Action<UIActionTypes>;

export type SideEffectsOptions = {
  successCondition: [string, string | number | boolean];
  loading: string;
  error: string;
  success: string;
};

export type FinalSideEffectCallback<T> = (response: IResponse<T>) => unknown;
