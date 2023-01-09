import { setupServer } from "msw/node";
import handlers from "./mockHandlers";

const server = setupServer(...handlers);

export default server;
