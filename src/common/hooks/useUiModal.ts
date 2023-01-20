import { useCallback, useEffect, useState } from "react";
import { UIState } from "../store/slices/ui";
import useUi from "../store/slices/ui/ui.hook";

export const MODAL_LIFE = 1_500;
export const MODAL_CLOSING_TIME = 250;

const useModal = () => {
  const {
    ui: { message, status },
    dispatch,
    uiMethods,
  } = useUi();
  const [localStatus, setLocalStatus] = useState<UIState["status"]>(status);
  const [isClosing, setClosing] = useState<boolean>(false);

  const closeModal = useCallback(() => {
    setClosing(true);

    setTimeout(() => {
      setLocalStatus("IDLE");
      dispatch(uiMethods.setIdleActionCreator());
      setClosing(false);
    }, MODAL_CLOSING_TIME);
  }, [dispatch, uiMethods]);

  useEffect(() => {
    setLocalStatus(status);

    if (status === "LOADING" || status === "IDLE") {
      return;
    }

    const timer = setTimeout(closeModal, MODAL_LIFE);

    return () => clearTimeout(timer);
  }, [closeModal, status]);

  return { message, localStatus, isClosing, closeModal };
};

export default useModal;
