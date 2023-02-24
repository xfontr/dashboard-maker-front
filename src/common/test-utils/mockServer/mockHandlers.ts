import { rest } from "msw";
import { IS_TOKEN_REQUIRED } from "../../../config/database";
import ENDPOINTS from "../../../config/endpoints";
import ENVIRONMENT from "../../../config/environment";
import { mockFullToken } from "../mocks/mockToken";
import { mockUser } from "../mocks";
import { CodedToken } from "../../../features/users/types/token.types";

/**
 * Expected usage: When testing, the test can replace an endpoint (see constant
 * ENDPOINTS) by this variable. If so, the request will be handled by a mock
 * endpoint that always returns a 400 error
 */

export const MOCK_FORCE_ERROR = "force-error";

/**
 * Change this object attributes to alter the handlers returned value, in order
 * to adapt the responses to the desired outcome when testing
 */

export const MOCK_DYNAMIC_DATA = {
  refreshToken: mockUser.authToken,
};

const { tokens, users } = ENDPOINTS;

const urlWithEndpoint = (endpoint: string) =>
  `${ENVIRONMENT.apiUrl}/${endpoint}`;

const handlers = [
  /** VERIFY TOKEN */
  rest.post(urlWithEndpoint(tokens.verify), (_, res, ctx) =>
    res(ctx.status(200), ctx.json({ token: mockFullToken }))
  ),

  /** SIGN UP USER */
  rest.post(urlWithEndpoint(users.signUp), (req, res, ctx) => {
    const isTokenRequired = req.headers.get("isTokenRequired")
      ? req.headers.get("isTokenRequired") === "true"
      : IS_TOKEN_REQUIRED;

    const authHeader = req.headers.get("authorization")?.replace("Bearer ", "");

    if (authHeader && isTokenRequired) {
      return res(ctx.status(201), ctx.json({ authorized: "Success" }));
    }
    if (!!authHeader === false && isTokenRequired) {
      return res(ctx.status(401), ctx.json({ fail: "Fail" }));
    }

    return res(ctx.status(201), ctx.json({ success: "Success" }));
  }),

  /** LOG IN USER */
  rest.post(urlWithEndpoint(users.logIn), (req, res, ctx) => {
    return res(
      ctx.status(req.body ? 200 : 400),
      ctx.json<CodedToken>({ user: { token: MOCK_DYNAMIC_DATA.refreshToken! } })
    );
  }),

  /** LOG OUT USER */
  rest.patch(urlWithEndpoint(users.logOut), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ logOut: "User logged out" }));
  }),

  /** GET USER PROFILE */
  rest.get(urlWithEndpoint(users.profile), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ user: mockUser }));
  }),

  /** GET ALL USERS */
  rest.get(urlWithEndpoint(users.getAll), (req, res, ctx) => {
    if (req.headers.get("authorization"))
      return res(ctx.status(200), ctx.json({ authorized: mockUser }));

    return res(ctx.status(200), ctx.json({ user: mockUser }));
  }),

  /** REFRESH TOKEN */
  rest.get(urlWithEndpoint(users.refreshToken), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<CodedToken>({ user: { token: MOCK_DYNAMIC_DATA.refreshToken! } })
    );
  }),

  /** FALSE ENDPOINT TO TEST ERROR CASES */
  rest.post(urlWithEndpoint(MOCK_FORCE_ERROR), (_, res, ctx) =>
    res(ctx.status(400), ctx.json({ error: "error" }))
  ),

  rest.get(urlWithEndpoint(MOCK_FORCE_ERROR), (_, res, ctx) =>
    res(ctx.status(400), ctx.json({ error: "error" }))
  ),

  rest.patch(urlWithEndpoint(MOCK_FORCE_ERROR), (_, res, ctx) =>
    res(ctx.status(400), ctx.json({ error: "error" }))
  ),
];

export default handlers;
