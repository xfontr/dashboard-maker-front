import jwt_decode from "jwt-decode";
import decodeToken from "../decodeToken";

jest.mock("jwt-decode");

describe("Given a getTokenData function", () => {
  describe("When called with a token (string) as an argument", () => {
    test("Then it should call a jwt decode function and return its value", () => {
      const token = "########";

      decodeToken(token);

      expect(jwt_decode).toHaveBeenCalledWith(token);
    });
  });
});
