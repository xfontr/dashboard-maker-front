import { useContext } from "react";
import store from "../..";
import IResponse from "../../../types/IResponse";
import {
  setErrorActionCreator,
  setLoadingActionCreator,
  setSuccessActionCreator,
} from "./ui.slice";
import { FinalSideEffectCallback, SideEffectsOptions } from "./ui.types";

const useUi = () => {
  const { ui, dispatch } = useContext(store.reducer.ui.Context);

  const handleSideEffects =
    <T>({ loading, success, error, successCondition }: SideEffectsOptions) =>
    async (callback: Function) => {
      dispatch(setLoadingActionCreator(loading));

      const response = await callback();

      return (ifTrue?: FinalSideEffectCallback<T>): Promise<IResponse<T>> => {
        if (response[successCondition[0]] === successCondition[1]) {
          dispatch(setSuccessActionCreator(success));
          ifTrue && ifTrue(response);
          return response;
        }

        dispatch(setErrorActionCreator(error));
        return response;
      };
    };

  return {
    ui,
    dispatch,
    handleSideEffects,
  };
};

export default useUi;
