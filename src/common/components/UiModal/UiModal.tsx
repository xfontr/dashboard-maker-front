import useModal from "../../hooks/useUiModal";
import { UIState } from "../../store/slices/ui";
import {
  CloseIcon,
  ErrorIcon,
  IconProps,
  SpinnerIcon,
  SuccessIcon,
} from "../Icon/Icon";
import ModalContainer from "../ModalContainer/ModalContainer";
import "./UiModal.scss";

export const icons: Omit<
  Record<UIState["status"], (props: IconProps) => JSX.Element>,
  "IDLE"
> = {
  SUCCESS: SuccessIcon,
  ERROR: ErrorIcon,
  LOADING: SpinnerIcon,
};

const UiModal = (): JSX.Element => {
  const { message, localStatus, closeModal, isClosing } = useModal();

  return (
    <>
      {localStatus !== "IDLE" && (
        <ModalContainer
          className={`modal--ui modal--${localStatus.toLowerCase()}${
            isClosing ? " modal--closing" : ""
          }`}
          childrenPosition="top"
        >
          <div className="modal__icon">{icons[localStatus]({})}</div>
          <div className="modal__content">
            <h3 className="modal__title">Status</h3>
            <span className="modal__message">{message}</span>
          </div>
          <button
            type="button"
            aria-label="close"
            className="modal__close"
            onClick={closeModal}
          >
            <CloseIcon />
          </button>
        </ModalContainer>
      )}
    </>
  );
};

export default UiModal;
