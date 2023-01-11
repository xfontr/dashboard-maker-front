import { rest } from "msw";
import ENDPOINTS from "../../../config/endpoints";
import ENVIRONMENT from "../../../config/environment";
import { mockFullToken } from "../mocks/mockToken";

const urlWithEndpoint = (endpoint: string) =>
  `${ENVIRONMENT.apiUrl}/${endpoint}`;

const handlers = [
  rest.post(urlWithEndpoint(ENDPOINTS.tokens.verify), (_, res, ctx) =>
    res(ctx.status(200), ctx.json({ token: mockFullToken }))
  ),

  rest.post(urlWithEndpoint(ENDPOINTS.users.signUp), (_, res, ctx) =>
    res(ctx.status(201), ctx.json({ success: "Success" }))
  ),
];

export default handlers;
