import { Action } from "./actions.types";

export interface ActionCreator<T extends string, S> {
  (payload?: S): Action<T>;
}
