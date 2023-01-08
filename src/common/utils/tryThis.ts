import IResponse from "../types/IResponse";
import { AxiosResponse, AxiosError } from "axios";

export const CustomResponse = <T>(data: AxiosResponse<T>): IResponse<T> => ({
  body: data.data,
  status: data.status,
});

const tryThis = async <T>(
  callback: Function,
  ...args: unknown[]
): Promise<IResponse<T>> => {
  try {
    return CustomResponse(await callback(...args));
  } catch (error) {
    return { error, status: (error as AxiosError).response?.status ?? 400 };
  }
};

export default tryThis;
