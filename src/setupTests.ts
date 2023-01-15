import "@testing-library/jest-dom/extend-expect";
import server from "./common/test-utils/mockServer/mockServer";

/** Mock Service Worker (MSW) */
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
