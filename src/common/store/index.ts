import { uiSlice } from "./slices/ui";

const store = {
  reducer: {
    ui: uiSlice,
  },
};

export default store;

export * from "./Store";
