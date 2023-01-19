import { useCallback, useEffect, useState } from "react";
import { UIState } from "../store/slices/ui";
import useUi from "../store/slices/ui/ui.hook";

const modalLife = 1500;
const modalClosingTime = 250;

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
    }, modalClosingTime);
  }, [dispatch, uiMethods]);

  useEffect(() => {
    setLocalStatus(status);

    if (status === "LOADING" || status === "IDLE") {
      return;
    }

    setTimeout(closeModal, modalLife);
  }, [closeModal, status]);

  return { message, localStatus, isClosing, closeModal };
};

export default useModal;
