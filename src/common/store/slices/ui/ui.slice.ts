import createSlice from "../../utils/createSlice";
import { ProtoSlice, Slice } from "../../types/slices.types";
import { UIActionTypes, UIState } from "./ui.types";

const protoUiSlice: ProtoSlice<UIActionTypes, UIState> = {
  name: "ui",

  initialState: {
    status: "IDLE",
    message: "Loading...",
  },

  reducers: {
    SET_ERROR: (state, payload: string) => ({
      ...state,
      status: "ERROR",
      message: payload,
    }),

    SET_SUCCESS: (state, payload: string) => ({
      ...state,
      status: "SUCCESS",
      message: payload,
    }),

    SET_IDLE: (state) => ({
      ...state,
      status: "IDLE",
      message: "",
    }),

    SET_LOADING: (state, payload: string) => ({
      ...state,
      status: "LOADING",
      message: payload,
    }),
  },
};

export const uiSlice: Slice<UIActionTypes, UIState> = createSlice(protoUiSlice);

export const setErrorActionCreator = uiSlice.actions.SET_ERROR<string>();
export const setIdleActionCreator = uiSlice.actions.SET_IDLE<string>();
export const setLoadingActionCreator = uiSlice.actions.SET_LOADING<string>();
export const setSuccessActionCreator = uiSlice.actions.SET_SUCCESS<string>();
