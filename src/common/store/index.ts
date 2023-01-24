import { userAuthSlice } from "../../features/users/store";
import { uiSlice } from "./slices/ui";

const store = {
  reducer: {
    ui: uiSlice,
    userAuth: userAuthSlice,
  },
};

export default store;
