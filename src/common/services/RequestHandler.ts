import axios, { Axios, AxiosRequestConfig } from "axios";
import ENVIRONMENT from "../../config/environment";
import REQUEST_RULES from "../../config/requestRules";
import tryThis from "../utils/tryThis";

const RequestHandler = ((handler: Axios) => (baseUrl: string) => {
  const Get = () => ({
    get: async <T>(
      endpoint: string,
      config: AxiosRequestConfig = {},
      url = baseUrl
    ) =>
      await tryThis<T>(handler.get, `${url}/${endpoint}`, {
        ...REQUEST_RULES,
        ...config,
      }),

    getWithAuth: async <T>(
      endpoint: string,
      token: string,
      config: AxiosRequestConfig = {},
      url = baseUrl
    ) =>
      await tryThis<T>(handler.get, `${url}/${endpoint}`, {
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
      await tryThis<T>(handler.post, `${url}/${endpoint}`, body, {
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
      await tryThis<T>(handler.post, `${url}/${endpoint}`, body, {
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
