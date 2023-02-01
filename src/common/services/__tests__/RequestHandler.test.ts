import { AxiosResponse, AxiosError } from "axios";
import { mockUser } from "../../test-utils/mocks";
import { api } from "../RequestHandler";
import ENDPOINTS from "../../../config/endpoints";
import { CustomResponse } from "../../utils/tryThis";
import IResponse from "../../types/IResponse";
import IUser from "../../../features/users/types/user.types";

const mockAxiosResponse = (response: unknown, status?: number): AxiosResponse =>
  ({
    data: response,
    status: status ?? 200,
  } as AxiosResponse);

describe("Given a get method from the api service", () => {
  describe("When called with an endpoint 'users'", () => {
    test("Then it should do a request with the api base url and return a custom response", async () => {
      const customResponse: IResponse<IUser> = CustomResponse(
        mockAxiosResponse({ user: mockUser })
      );

      const response = await api.get<IUser>(ENDPOINTS.users.getAll);

      expect(response).toStrictEqual(customResponse);
    });

    describe("When called with an endpoint, a specific base url and configuration", () => {
      test("Then it should do a request with all the passed params", async () => {
        const customResponse: IResponse<IUser> = CustomResponse(
          mockAxiosResponse({ authorized: mockUser })
        );

        const config = {
          headers: {
            authorization: "bearer",
          },
        };

        const response = await api.get<IUser>(ENDPOINTS.users.getAll, config);

        expect(response).toStrictEqual(customResponse);
      });
    });
  });
});

describe("Given a getWithAuth method from the api service", () => {
  describe("When called with an endpoint 'users' and an auth token 'auth'", () => {
    test("Then it should do a request with the api base url, the default configuration and the token", async () => {
      const token = "token";

      const customResponse: IResponse<IUser> = CustomResponse(
        mockAxiosResponse({ authorized: mockUser })
      );

      const response = await api.getWithAuth<IUser>(
        ENDPOINTS.users.getAll,
        token
      );

      expect(response).toStrictEqual(customResponse);
    });
  });
});

describe("Given a post method from the api service", () => {
  describe("When called with an endpoint 'users' and a user as body and custom configuration", () => {
    test("Then it should do a request with the api base url, the passed configuration and the body", async () => {
      const customResponse: IResponse<IUser> = CustomResponse(
        mockAxiosResponse({ success: "Success" }, 201)
      );

      const response = await api.post<unknown, IUser>(
        ENDPOINTS.users.signUp,
        mockUser,
        {
          headers: { isTokenRequired: false },
        }
      );

      expect(response).toStrictEqual(customResponse);
    });

    describe("When called with an endpoint 'users' and a user as body", () => {
      test("Then it should do a request with the api base url, the default configuration and the body", async () => {
        const customResponse: IResponse<IUser> = {
          error: new AxiosError("Request failed with status code 401"),
          status: 401,
        };

        const response = await api.post<unknown, IUser>(
          ENDPOINTS.users.signUp,
          mockUser
        );

        expect(response).toStrictEqual(customResponse);
      });
    });
  });
});

describe("Given a postWithAuth method from the api service", () => {
  describe("When called with an endpoint 'users', a user as body and a token 'auth'", () => {
    test("Then it should do a request with the api base url, the default configuration and the token", async () => {
      const customResponse: IResponse<IUser> = CustomResponse(
        mockAxiosResponse({ authorized: "Success" }, 201)
      );
      const token = "auth";

      const response = await api.postWithAuth<unknown, IUser>(
        ENDPOINTS.users.signUp,
        mockUser,
        token
      );

      expect(response).toStrictEqual(customResponse);
    });
  });
});
