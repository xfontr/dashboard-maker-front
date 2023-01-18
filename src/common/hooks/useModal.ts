import { useEffect, useState } from "react";
import { UIState } from "../store/slices/ui";
import useUi from "../store/slices/ui/ui.hook";

const modalTimeout = 1502344230;

const useModal = () => {
  const {
    ui: { message, status },
    dispatch,
    uiMethods,
  } = useUi();
  const [localStatus, setLocalStatus] = useState<UIState["status"]>(status);

  useEffect(() => {
    setLocalStatus(status);

    if (status === "LOADING" || status === "IDLE") {
      return;
    }

    setTimeout(() => {
      setLocalStatus("IDLE");
      dispatch(uiMethods.setIdleActionCreator());
    }, modalTimeout);
  }, [dispatch, status, uiMethods]);

  const closeModal = () => {
    setLocalStatus("IDLE");
    dispatch(uiMethods.setIdleActionCreator());
  };

  return { message, localStatus, closeModal };
};

export default useModal;
