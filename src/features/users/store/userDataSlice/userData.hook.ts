import { useContext } from "react";
import store from "../../../../common/store";

const useUserData = () => {
  const { dispatch, userData } = useContext(store.reducer.userData.Context);

  return {
    userData: userData!,
    dispatch,
  };
};

export default useUserData;
