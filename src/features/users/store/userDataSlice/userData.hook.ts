import { useContext } from "react";
import store from "../../../../common/store";

const useUserData = () => {
  const { dispatch, userData } = useContext(store.reducer.userData.Context);

  return {
    dispatch,
    userData: userData!,
  };
};

export default useUserData;
