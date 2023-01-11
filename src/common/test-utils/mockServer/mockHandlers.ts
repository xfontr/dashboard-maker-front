import { rest } from "msw";
import ENDPOINTS from "../../../config/endpoints";
import ENVIRONMENT from "../../../config/environment";
import { mockFullToken } from "../mocks/mockToken";
import mockUser from "../mocks/mockUser";

const urlWithEndpoint = (endpoint: string) =>
  `${ENVIRONMENT.apiUrl}/${endpoint}`;

const handlers = [
  rest.post(urlWithEndpoint(ENDPOINTS.tokens.verify), (_, res, ctx) =>
    res(ctx.status(200), ctx.json({ token: mockFullToken }))
  ),

  rest.post(urlWithEndpoint(ENDPOINTS.users.signUp), (req, res, ctx) => {
    if (req.headers.get("authorization"))
      return res(ctx.status(201), ctx.json({ authorized: "Success" }));

    return res(ctx.status(201), ctx.json({ success: "Success" }));
  }),

  rest.get(urlWithEndpoint(ENDPOINTS.users.getAll), (req, res, ctx) => {
    if (req.headers.get("authorization"))
      return res(ctx.status(200), ctx.json({ authorized: mockUser }));

    return res(ctx.status(200), ctx.json({ user: mockUser }));
  }),
];

export default handlers;
