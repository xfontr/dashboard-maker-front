import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { Store } from "../store/StoreProvider";

export const baseWrapper =
  (initialEntries?: string[]) =>
  ({ children }: PropsWithChildren): JSX.Element =>
    (
      <MemoryRouter {...{ initialEntries }}>
        <Store>{children}</Store>
      </MemoryRouter>
    );

export default baseWrapper();
