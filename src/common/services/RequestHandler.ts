import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import ENVIRONMENT from "../../config/environment";
import tryThis from "../utils/tryThis";

export const apiHandler = axios.create({
  baseURL: ENVIRONMENT.apiUrl,
  timeout: 8_000,
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
    post: async <T = unknown, R = unknown>(
      endpoint: string,
      body: R,
      config: AxiosRequestConfig = {}
    ) =>
      await tryThis<T>(handler.post, endpoint, body, {
        ...config,
      }),

    postWithAuth: async <T = unknown, R = unknown>(
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

  const Patch = () => ({
    patch: async <T = unknown, R = unknown>(
      endpoint: string,
      body: R,
      config: AxiosRequestConfig = {}
    ) =>
      await tryThis<T>(handler.patch, endpoint, body, {
        ...config,
      }),
  });

  return {
    ...Get(),
    ...Post(),
    ...Patch(),
  };
};

export const api = RequestHandler(apiHandler);

export default RequestHandler;
