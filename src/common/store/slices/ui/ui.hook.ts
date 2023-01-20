import { useContext } from "react";
import store from "../..";

const useUi = () => {
  const { ui, dispatch } = useContext(store.reducer.ui.Context);

  return {
    ui,
    dispatch,
  };
};

export default useUi;
