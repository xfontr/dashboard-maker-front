import { PropsWithChildren } from "react";
import { MemoryRouter } from "react-router-dom";
import { Store } from "../store/StoreProvider";
import { Context as ResponsiveContext } from "react-responsive";

export const baseWrapper =
  (initialEntries?: string[], screenWidth: number = 1600) =>
  ({ children }: PropsWithChildren): JSX.Element =>
    (
      <MemoryRouter {...{ initialEntries }}>
        <Store>
          <ResponsiveContext.Provider value={{ width: screenWidth }}>
            {children}
          </ResponsiveContext.Provider>
        </Store>
      </MemoryRouter>
    );

export default baseWrapper();
