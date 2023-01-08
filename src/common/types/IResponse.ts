type IResponse<T> = {
  body?: T;
  status?: number;
  error?: unknown;
};

export default IResponse;
