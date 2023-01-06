import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";

export const baseWrapper =
  (initialEntries?: string[]) =>
  ({ children }: PropsWithChildren): JSX.Element =>
    <MemoryRouter {...{ initialEntries }}>{children}</MemoryRouter>;

export default baseWrapper();
