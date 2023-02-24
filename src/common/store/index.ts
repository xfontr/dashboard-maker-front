import { userAuthSlice } from "../../features/users/store/userAuthSlice/userAuth.slice";
import { userDataSlice } from "../../features/users/store/userDataSlice/userData.slice";
import { uiSlice } from "./slices/ui";

const store = {
  reducer: {
    ui: uiSlice,
    userAuth: userAuthSlice,
    userData: userDataSlice
  },
};

export default store;
