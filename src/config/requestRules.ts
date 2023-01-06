import { AxiosRequestConfig } from "axios";

const REQUEST_RULES: AxiosRequestConfig = {
  /**
   * In milliseconds. Once the time is over, the request will be aborted. If set
   * to 0, no timeout will be applied
   */
  timeout: 8000,
};

export default REQUEST_RULES;
