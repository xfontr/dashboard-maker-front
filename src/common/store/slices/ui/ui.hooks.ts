import { useContext } from "react";
import store from "../..";
import { MODAL_CLOSING_TIME } from "../../../hooks/useUiModal";
import { SideEffectsOptions } from "../../../types/IQuery";
import {
  setErrorActionCreator,
  setIdleActionCreator,
  setLoadingActionCreator,
  setSuccessActionCreator,
} from "./ui.slice";

export const useUi = () => {
  const { ui, dispatch } = useContext(store.reducer.ui.Context);

  return {
    ui: ui!,
    dispatch,
  };
};

/**
 * Hook that handles the most commonly used UI status. It takes an object with
 * all the desired messages and returns methods to handle the UI.
 *
 * @example
 *   {
 *   success: "User registered"
 *   error: "Something went wrong"
 *   loading: "Getting your data..."
 *   }
 *
 * @param messages
 */

export const useUiMiddlewares = <T>(
  messages: Omit<SideEffectsOptions<T>, "successCondition">
) => {
  const { ui, dispatch } = useUi();

  /**
   * Sets the UI back to IDLE, so it will go away. It does so with a small
   * detail time of less than half of a second
   */

  const resetUi = (): void => {
    setTimeout(() => dispatch(setIdleActionCreator()), MODAL_CLOSING_TIME);
  };

  /**
   * Sets the UI to loading status, with the message specified in the options
   * object. If there was no message specified, it will set it to IDLE
   */

  const showLoadingUi = (): void => {
    messages.loading
      ? dispatch(setLoadingActionCreator(messages.loading))
      : resetUi();
  };

  /**
   * Sets the UI to success status, with the message specified in the options
   * object. If there was no message specified, it will set it to IDLE
   */

  const showSuccessUi = (): void => {
    messages.success
      ? dispatch(setSuccessActionCreator(messages.success))
      : resetUi();
  };

  /**
   * Sets the UI to error status, with the message specified in the options
   * object. If there was no message specified, it will set it to IDLE
   */

  const showErrorUi = (): void => {
    messages.error
      ? dispatch(setErrorActionCreator(messages.error))
      : resetUi();
  };

  return {
    ui,
    resetUi,
    showLoadingUi,
    showSuccessUi,
    showErrorUi,
  };
};
