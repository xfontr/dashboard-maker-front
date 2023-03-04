import { logOutActionCreator } from "../../features/users/store/userAuthSlice/userAuth.slice";
import useUserAuth from "../../features/users/store/userAuthSlice/userAuth.hook";
import useUserData from "../../features/users/store/userDataSlice/userData.hook";
import { resetDataActionCreator } from "../../features/users/store/userDataSlice/userData.slice";
import userDataSets from "../assets/userDataSets.json";
import { useRef } from "react";
import DataUnit from "../types/DataUnit";

const useUser = () => {
  const { dispatch, userAuth } = useUserAuth();
  const { dispatch: dataDispatch, userData } = useUserData();

  const logOut = () => {
    dispatch(logOutActionCreator());
    dataDispatch(resetDataActionCreator());
  };

  const getUserDataSet = (name: keyof typeof userDataSets): DataUnit[] =>
    userDataSets[name].map((set) => ({
      heading: set,
      data: userData[set as keyof typeof userData] ?? undefined,
    }));

  return {
    dispatch,
    userAuth,
    logOut,
    getUserDataSet,
  };
};

export default useUser;
