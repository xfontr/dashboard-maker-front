import { PropsWithChildren, useReducer } from "react";
import { createContext } from "react";

const store = {
  reducer: {
    ui: {
      status: "LOADING",
    },
    hi: {
      status: "BIG",
    },
  },
};

const configureStore = (storeValues: typeof store) =>
  Object.keys(storeValues.reducer).map((context) =>
    baseContextProvider(context)
  );

const baseContextProvider =
  (context: any) =>
  ({ children }: PropsWithChildren) => {
    const [contextReducer, dispatch] = useReducer(() => "", context);

    const { Provider } = createContext({ ...context, dispatch });

    return <Provider value={contextReducer}>{children}</Provider>;
  };

const baseStore =
  (storeProviders: (({ children }: PropsWithChildren) => JSX.Element)[]) =>
  ({ children }: PropsWithChildren): JSX.Element =>
    (
      <>
        {storeProviders.reduce(
          (children, Provider) => (
            <Provider>{children}</Provider>
          ),
          children
        )}
      </>
    );

const Store = baseStore(configureStore(store));

export default Store;
