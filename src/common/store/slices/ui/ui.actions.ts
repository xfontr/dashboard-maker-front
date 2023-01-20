import { Action } from "../../types/actions.types";
import { UIActionTypes } from "./ui.types";

export const setErrorActionCreator = (
  payload?: Action<UIActionTypes>["payload"]
): Action<UIActionTypes> => ({
  type: "SET_ERROR",
  payload: payload ?? "Something went wrong",
});

export const setSuccessActionCreator = (
  payload?: Action<UIActionTypes>["payload"]
): Action<UIActionTypes> => ({
  type: "SET_SUCCESS",
  payload: payload ?? "Success",
});

export const setIdleActionCreator = (): Action<UIActionTypes> => ({
  type: "SET_IDLE",
});

export const setLoadingActionCreator = (
  payload?: Action<UIActionTypes>["payload"]
): Action<UIActionTypes> => ({
  type: "SET_LOADING",
  payload: payload ?? "Loading...",
});
