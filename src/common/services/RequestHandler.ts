import axios, { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import ENVIRONMENT from "../../config/environment";
import REQUEST_RULES from "../../config/requestRules";

const RequestHandler = ((handler: Axios) => (baseUrl: string) => {
  const Get = () => ({
    get: async <T>(
      endpoint: string,
      config: AxiosRequestConfig = {},
      url = baseUrl
    ): Promise<AxiosResponse<T>> =>
      await handler.get<T>(`${url}/${endpoint}`, {
        ...REQUEST_RULES,
        ...config,
      }),

    getWithAuth: async <T>(
      endpoint: string,
      token: string,
      config: AxiosRequestConfig = {},
      url = baseUrl
    ) =>
      await handler.get<T>(`${url}/${endpoint}`, {
        ...REQUEST_RULES,
        ...config,
        headers: { authorization: `Bearer ${token}` },
      }),
  });

  const Post = () => ({
    post: async <T, R>(
      endpoint: string,
      body: R,
      config: AxiosRequestConfig = {},
      url = baseUrl
    ) =>
      await handler.post<T>(`${url}/${endpoint}`, body, {
        ...REQUEST_RULES,
        ...config,
      }),

    // TODO: Unit test this
    postWithAuth: async <T, R>(
      endpoint: string,
      body: R,
      token: string,
      config: AxiosRequestConfig = {},
      url = baseUrl
    ) =>
      await handler.post<T>(`${url}/${endpoint}`, body, {
        ...REQUEST_RULES,
        ...config,
        headers: { authorization: `Bearer ${token}` },
      }),
  });

  return {
    ...Get(),
    ...Post(),
  };
})(axios);

export const api = RequestHandler(ENVIRONMENT.apiUrl);

export default RequestHandler;
