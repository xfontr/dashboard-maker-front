import useModal from "../../hooks/useModal";
import ModalContainer from "../ModalContainer/ModalContainer";
import "./UiModal.scss";

const UiModal = (): JSX.Element => {
  const { message, localStatus, closeModal } = useModal();

  return (
    <>
      {localStatus !== "IDLE" && (
        <ModalContainer className="modal--ui" childrenPosition="top">
          <div className="modal__content">
            <h3 className="modal__title">Status</h3>
            <span className="modal__message">{message}</span>
          </div>
          <div className="modal__close" onClick={closeModal}>
            X
          </div>
        </ModalContainer>
      )}
    </>
  );
};

export default UiModal;
