import { createContext } from "react";
import { Action, ProtoSlice, Slice, StoreBranchWithDispatch } from "../types";

export const reducer =
  <T extends string, R>(reducers: Slice<T, R>["methods"]) =>
  (currentState: R, { type, payload }: Action<T>): R =>
    reducers[type] ? reducers[type](currentState, payload) : currentState;

export const SetReducer = <T extends string, R>(
  methods: ProtoSlice<T, R>["methods"]
): Pick<Slice<T, R>, "reducer"> => ({
  reducer: reducer(methods),
});

export const SetContext = <T extends string, R>(slice: ProtoSlice<T, R>) => ({
  Context: createContext<StoreBranchWithDispatch<R, T>>({
    [slice.name]: slice.initialState,
    dispatch: () => {},
  }),
});

/**
 * @param slice A slice with only its name, initial value and methods
 * @returns A full slice with the proto slice attributes and also a reducer
 *   function and its react context
 */

export const ComposeSlice = <T extends string, R>(
  slice: ProtoSlice<T, R>
): Slice<T, R> => ({
  ...slice,
  ...SetContext(slice),
  ...SetReducer(slice.methods),
});

export default ComposeSlice;
