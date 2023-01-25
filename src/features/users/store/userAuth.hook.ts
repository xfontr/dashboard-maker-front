import { useContext } from "react";
import store from "../../../common/store";

const useUserAuth = () => {
  const { dispatch, userAuth } = useContext(store.reducer.userAuth.Context);

  return {
    userAuth: userAuth!,
    dispatch,
  };
};

export default useUserAuth;
