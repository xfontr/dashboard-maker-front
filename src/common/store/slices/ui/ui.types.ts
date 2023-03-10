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
