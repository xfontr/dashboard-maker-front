import { Context, Dispatch } from "react";
import store from "..";
import { Action, Payload } from "./actions.types";

export type Stores = keyof (typeof store)["reducer"];

export type StoreBranch<T> = Record<Stores, T>;

/**
 * @example
 *   type T = {
 *     status: "IDLE";
 *   };
 *
 *   type R = "SET_ERROR";
 *
 *   StoreBranchWithDispatch<UIState, UIActionTypes>;
 *   // {
 *   //   ui: T,
 *   //   dispatch: (type: R) => {}
 *   // }
 *
 * @param T The branch state
 * @param R The action type
 */

export interface StoreBranchWithDispatch<T, R extends string>
  extends StoreBranch<T> {
  dispatch: Dispatch<Action<R>>;
}

export type ProtoSlice<T extends string, R> = {
  name: Stores;
  initialState: R;
  methods: Record<
    Action<T>["type"],
    (state: R, payload?: Action<T>["payload"]) => R
  >;
};

export interface Slice<T extends string, R> extends ProtoSlice<T, R> {
  Context: Context<StoreBranchWithDispatch<R, T>>;
  reducer: (state: R, payload?: Payload) => R;
}
