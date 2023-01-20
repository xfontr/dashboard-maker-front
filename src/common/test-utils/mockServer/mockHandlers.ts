import { rest } from "msw";
import { IS_TOKEN_REQUIRED } from "../../../config/database";
import ENDPOINTS from "../../../config/endpoints";
import ENVIRONMENT from "../../../config/environment";
import { mockFullToken } from "../mocks/mockToken";
import { mockUser } from "../mocks";

export const FORCE_ERROR = "force-error";

const urlWithEndpoint = (endpoint: string) =>
  `${ENVIRONMENT.apiUrl}/${endpoint}`;

const handlers = [
  rest.post(urlWithEndpoint(ENDPOINTS.tokens.verify), (_, res, ctx) =>
    res(ctx.status(200), ctx.json({ token: mockFullToken }))
  ),

  rest.post(urlWithEndpoint(ENDPOINTS.users.signUp), (req, res, ctx) => {
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

  rest.get(urlWithEndpoint(ENDPOINTS.users.getAll), (req, res, ctx) => {
    if (req.headers.get("authorization"))
      return res(ctx.status(200), ctx.json({ authorized: mockUser }));

    return res(ctx.status(200), ctx.json({ user: mockUser }));
  }),

  rest.post(urlWithEndpoint(FORCE_ERROR), (_, res, ctx) =>
    res(ctx.status(400), ctx.json({ error: "error" }))
  ),
];

export default handlers;
