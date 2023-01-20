export type Payload = any;

export type BaseAction<T extends string> = {
  type: T;
};

/**
 * @example
 *   Action<UIActionTypes>;
 *   // {
 *   //   type: UIActionTypes;
 *   //   payload: any
 *   // }
 *
 * @param T The type of the action, must be a string
 */

export interface Action<T extends string> extends BaseAction<T> {
  payload?: Payload;
}
