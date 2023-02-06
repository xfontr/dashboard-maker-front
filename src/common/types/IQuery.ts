import IResponse from "./IResponse";

export type SideEffectsOptions<T> = {
  successCondition?: [keyof T, string | number | boolean];
  loading?: string;
  error?: string;
  success?: string;
};

export type QueryOptions<T, L> = {
  onSuccess?: (response: IResponse<T>, values?: L) => unknown;
  onError?: (response: IResponse<T>) => unknown;
  onInit?: () => void;
  options?: SideEffectsOptions<IResponse<T>>;
};
