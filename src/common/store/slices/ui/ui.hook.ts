import { useContext } from "react";
import store from "../..";
import * as uiMethods from "./ui.actions";

const useUi = () => {
  const { ui, dispatch } = useContext(store.reducer.ui.Context);

  return {
    ui,
    dispatch,
    uiMethods,
  };
};

export default useUi;
