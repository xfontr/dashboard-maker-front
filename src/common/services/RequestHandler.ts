import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import ENVIRONMENT from "../../config/environment";
import REQUEST_RULES from "../../config/requestRules";
import tryThis from "../utils/tryThis";

const apiHandler = axios.create({
  baseURL: ENVIRONMENT.apiUrl,
  ...REQUEST_RULES,
});

export const RequestHandler = (handler: AxiosInstance) => {
  const Get = () => ({
    get: async <T>(endpoint: string, config: AxiosRequestConfig = {}) =>
      await tryThis<T>(handler.get, endpoint, {
        ...config,
      }),

    getWithAuth: async <T>(
      endpoint: string,
      token: string,
      config: AxiosRequestConfig = {}
    ) =>
      await tryThis<T>(handler.get, endpoint, {
        ...config,
        headers: { ...config?.headers, authorization: `Bearer ${token}` },
      }),
  });

  const Post = () => ({
    post: async <T, R>(
      endpoint: string,
      body: R,
      config: AxiosRequestConfig = {}
    ) =>
      await tryThis<T>(handler.post, endpoint, body, {
        ...config,
      }),

    postWithAuth: async <T, R>(
      endpoint: string,
      body: R,
      token: string,
      config: AxiosRequestConfig = {}
    ) =>
      await tryThis<T>(handler.post, endpoint, body, {
        ...config,
        headers: { ...config?.headers, authorization: `Bearer ${token}` },
      }),
  });

  return {
    ...Get(),
    ...Post(),
  };
};

export const api = RequestHandler(apiHandler);

export default RequestHandler;
