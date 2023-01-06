import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import ENVIRONMENT from "../config/environment";
import REQUEST_RULES from "../config/requestRules";

const RequestHandler = ((handler: Axios) => (baseUrl: string) => {
  const Get = () => ({
    get: async <T>(
      config: AxiosRequestConfig = {},
      url: string = baseUrl
    ): Promise<AxiosResponse<T>> =>
      await handler.get<T>(url, { ...REQUEST_RULES, ...config }),

    getWithAuth: async <T>(
      token: string,
      config: AxiosRequestConfig = {},
      url: string = baseUrl
    ) =>
      await handler.get<T>(url, {
        ...REQUEST_RULES,
        ...config,
        headers: { Authentication: token },
      }),
  });

  const Post = () => ({
    post: async <T, R>(
      body: R,
      config: AxiosRequestConfig = {},
      url: string = baseUrl
    ) => await handler.post<T>(url, body, { ...REQUEST_RULES, ...config }),
  });

  return {
    ...Get(),
    ...Post(),
  };
})(axios);

export const api = RequestHandler(ENVIRONMENT.apiUrl);

export default RequestHandler;
