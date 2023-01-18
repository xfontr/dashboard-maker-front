import { PropsWithChildren, useReducer } from "react";
import store from ".";

/**
 * @returns A JSX Element containing a list of Providers. Each provider will
 *   have as value a branch of the store, and as a child it will contain the
 *   next provider, which will eventually contain the original children passed.
 *
 *   The result is a list of nested providers that should surround the app and
 *   provide it with its store values
 */

export const configureStore =
  (initialStore: typeof store) =>
  ({ children }: PropsWithChildren) =>
    (
      <>
        {Object.values(initialStore.reducer).reduce(
          (children, { Context, initialState, name, reducer }) => {
            const { Provider } = Context;
            const [value, dispatch] = useReducer(reducer, { ...initialState });

            return (
              <Provider value={{ [name]: value, dispatch }}>
                {children}
              </Provider>
            );
          },
          children
        )}
      </>
    );

export const Store = configureStore(store);
