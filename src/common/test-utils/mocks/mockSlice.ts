import { ProtoSlice, Slice } from "../../store/types";
import createSlice from "../../store/utils/createSlice";
import { mockUser } from "./mockUser";

export type MockActionTypes = "TEST" | "TEST_2";

export const mockState = {
  name: mockUser.name,
  surname: mockUser.surname,
};

export const mockProtoSlice: ProtoSlice<MockActionTypes, typeof mockState> = {
  name: "ui",

  initialState: mockState,

  reducers: {
    TEST: (state: typeof mockState, payload: string) => ({
      ...state,
      name: payload,
    }),

    TEST_2: (state: typeof mockState, payload: string) => ({
      ...state,
      surname: payload,
    }),
  },
};

export const mockSlice: Slice<MockActionTypes, typeof mockState> =
  createSlice(mockProtoSlice);
