import ComposeSlice from "../../utils/ComposeSlice";
import { ProtoSlice, Slice } from "../../types/slices.types";
import { UIActionTypes, UIState } from "./ui.types";

const protoUiSlice: ProtoSlice<UIActionTypes, UIState> = {
  name: "ui",

  initialState: {
    status: "IDLE",
    message: "Loading...",
  },

  methods: {
    SET_ERROR: (state: UIState, payload: string) => ({
      ...state,
      status: "ERROR",
      message: payload,
    }),

    SET_SUCCESS: (state: UIState, payload: string) => ({
      ...state,
      status: "SUCCESS",
      message: payload,
    }),

    SET_IDLE: (state: UIState) => ({
      ...state,
      status: "IDLE",
      message: "",
    }),

    SET_LOADING: (state: UIState, payload: string) => ({
      ...state,
      status: "LOADING",
      message: payload,
    }),
  },
};

export const uiSlice: Slice<UIActionTypes, UIState> =
  ComposeSlice(protoUiSlice);

export default uiSlice;
