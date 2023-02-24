import { useContext } from "react";
import store from "../../../../common/store";
import useUserData from "../userDataSlice/userData.hook";
import { resetDataActionCreator } from "../userDataSlice/userData.slice";
import { logOutActionCreator } from "./userAuth.slice";

const useUserAuth = () => {
  const { dispatch, userAuth } = useContext(store.reducer.userAuth.Context);

  return {
    userAuth: userAuth!,
    dispatch,
  };
};

export const useUserAuthMiddlewares = () => {
  const { dispatch, userAuth } = useUserAuth()
  const { dispatch: dataDispatch } = useUserData()

  const logUserOut = () => {
    dispatch(logOutActionCreator());
    dataDispatch(resetDataActionCreator());
  };

  return {
    dispatch,
    userAuth,
    logUserOut,
  }
}

export default useUserAuth;
