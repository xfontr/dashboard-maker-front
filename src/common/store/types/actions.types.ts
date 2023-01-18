export type Payload = any;

export type BaseAction<T extends string> = {
  type: T;
};

export interface Action<T extends string> extends BaseAction<T> {
  payload?: Payload;
}
