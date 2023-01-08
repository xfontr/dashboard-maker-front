import { AxiosRequestConfig } from "axios";
import mockUser from "../../test-utils/mocks/mockUser";
import ENVIRONMENT from "../../../config/environment";
import REQUEST_RULES from "../../../config/requestRules";
import { api } from "../RequestHandler";

// TODO: Replace mocks and use Mock Service Worker instead

const mockGet = jest.fn();
const mockPost = jest.fn();

jest.mock("axios", () => ({
  get: (url: string, config: AxiosRequestConfig<{}>) => mockGet(url, config),
  post: (url: string, body: unknown, config: AxiosRequestConfig<{}>) =>
    mockPost(url, body, config),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a get method from the api service", () => {
  describe("When called with an endpoint 'users'", () => {
    test("Then it should do a request with the api base url and the default configuration", async () => {
      const endpoint = "users";

      await api.get(endpoint);

      expect(mockGet).toHaveBeenCalledWith(
        `${ENVIRONMENT.apiUrl}/${endpoint}`,
        REQUEST_RULES
      );
    });

    describe("When called with an endpoint, a specific base url and configuration", () => {
      test("Then it should do a request with all the passed params", async () => {
        const endpoint = "users";
        const config = {
          ...REQUEST_RULES,
          headers: {
            authorization: "bearer",
          },
        };
        const baseUrl = "base";

        await api.get(endpoint, config, baseUrl);

        expect(mockGet).toHaveBeenCalledWith(`${baseUrl}/${endpoint}`, config);
      });
    });
  });
});

describe("Given a getWithAuth method from the api service", () => {
  describe("When called with an endpoint 'users' and an auth token 'auth'", () => {
    test("Then it should do a request with the api base url, the default configuration and the token", async () => {
      const endpoint = "users";
      const token = "token";
      const config = {
        ...REQUEST_RULES,
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      await api.getWithAuth(endpoint, token);

      expect(mockGet).toHaveBeenCalledWith(
        `${ENVIRONMENT.apiUrl}/${endpoint}`,
        config
      );
    });
  });
});

describe("Given a post method from the api service", () => {
  describe("When called with an endpoint 'users' and a user as body", () => {
    test("Then it should do a request with the api base url, the default configuration and the body", async () => {
      const endpoint = "users";

      await api.post(endpoint, mockUser);

      expect(mockPost).toHaveBeenCalledWith(
        `${ENVIRONMENT.apiUrl}/${endpoint}`,
        mockUser,
        REQUEST_RULES
      );
    });
  });
});

describe("Given a postWithAuth method from the api service", () => {
  describe("When called with an endpoint 'users', a user as body and a token 'auth'", () => {
    test("Then it should do a request with the api base url, the default configuration and the token", async () => {
      const endpoint = "users";
      const token = "auth";

      const config = {
        ...REQUEST_RULES,
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      await api.postWithAuth(endpoint, mockUser, token);

      expect(mockPost).toHaveBeenCalledWith(
        `${ENVIRONMENT.apiUrl}/${endpoint}`,
        mockUser,
        config
      );
    });
  });
});
