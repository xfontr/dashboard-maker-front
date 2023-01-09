import { rest } from "msw";
import ENDPOINTS from "../../../config/endpoints";

const handlers = [
  rest.post(ENDPOINTS.users.signUp, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(""));
  }),
];

export default handlers;
