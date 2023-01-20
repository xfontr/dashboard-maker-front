import { createContext } from "react";
import {
  Action,
  Payload,
  ProtoSlice,
  Slice,
  StoreBranchWithDispatch,
} from "../types";

export const reducer =
  <T extends string, R>(reducers: Slice<T, R>["reducers"]) =>
  (currentState: R, { type, payload }: Action<T>): R =>
    reducers[type] ? reducers[type](currentState, payload) : currentState;

export const SetReducer = <T extends string, R>(
  methods: ProtoSlice<T, R>["reducers"]
): Pick<Slice<T, R>, "reducer"> => ({
  reducer: reducer(methods),
});

export const SetContext = <T extends string, R>(slice: ProtoSlice<T, R>) => ({
  Context: createContext<StoreBranchWithDispatch<R, T>>({
    [slice.name]: slice.initialState,
    dispatch: () => {},
  }),
});

export const SetActions = <T extends string, R>(
  reducers: ProtoSlice<T, R>["reducers"]
) => {
  const actions = Object.keys(reducers).reduce((actions, name) => {
    return {
      ...actions,
      [name]: () => (payload?: Payload) => {
        const action = {
          type: name as T,
        };

        return payload ? { ...action, payload } : action;
      },
    };
  }, {}) as Slice<T, R>["actions"];

  return {
    actions,
  };
};

/**
 * @param slice A slice with only its name, initial value and methods
 * @returns A full slice with the proto slice attributes and also a reducer
 *   function and its react context
 */

export const createSlice = <T extends string, R>(
  slice: ProtoSlice<T, R>
): Slice<T, R> => ({
  ...slice,
  ...SetContext(slice),
  ...SetReducer(slice.reducers),
  ...SetActions(slice.reducers),
});

export default createSlice;
