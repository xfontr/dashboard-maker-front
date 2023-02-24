import { logOutActionCreator } from "../../features/users/store";
import useUserAuth from "../../features/users/store/userAuthSlice/userAuth.hook";
import useUserData from "../../features/users/store/userDataSlice/userData.hook";
import { resetDataActionCreator } from "../../features/users/store/userDataSlice/userData.slice";

const useUser = () => {
  const { dispatch, userAuth } = useUserAuth();
  const { dispatch: dataDispatch } = useUserData();

  const logUserOut = () => {
    dispatch(logOutActionCreator());
    dataDispatch(resetDataActionCreator());
  };

  return {
    dispatch,
    userAuth,
    logUserOut,
  };
};

export default useUser;
