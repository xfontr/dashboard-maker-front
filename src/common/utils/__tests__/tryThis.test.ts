import tryThis from "../tryThis";
import { AxiosError, AxiosResponse } from "axios";

describe("Given a tryThis function", () => {
  describe("When called with a function Get and arguments 'user'", () => {
    test("Then it should return the function data and status", async () => {
      const args = "user";

      const mockFunction = jest.fn().mockResolvedValue({
        data: "Body",
        status: 200,
      });

      const expectedResponse = {
        body: "Body",
        status: 200,
      };

      const result = await tryThis(mockFunction, args);

      expect(mockFunction).toHaveBeenCalledWith(args);
      expect(result).toStrictEqual(expectedResponse);
    });
  });

  describe("And the function returns an error", () => {
    test("Then it should return the error and the error status", async () => {
      const error = new AxiosError("", "", {}, "", {
        status: 400,
      } as AxiosResponse);

      const mockFunction = jest.fn().mockRejectedValue(error);

      const expectedResponse = {
        error: error,
        status: error.response?.status,
      };

      const result = await tryThis(mockFunction);

      expect(result).toStrictEqual(expectedResponse);
    });
  });
});
