import { HTMLAttributes, ReactNode } from "react";
import setProps from "../../utils/setProps";
import Portal from "../Portal/Portal";
import "./ModalContainer.scss";

interface ModalContainerProps extends HTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  childrenPosition?: "top" | "center";
  backDrop?: boolean;
}

const Dialog = ({
  children,
  backDrop,
  childrenPosition,
  ...rest
}: ModalContainerProps) => (
  <dialog
    {...setProps(
      rest,
      "className",
      backDrop ? "modal" : `modal modal--${childrenPosition}`
    )}
    open
  >
    {children}
  </dialog>
);

const ModalContainer = ({
  children,
  backDrop = false,
  childrenPosition = "center",
  ...rest
}: ModalContainerProps): JSX.Element => (
  <Portal>
    {backDrop ? (
      <div
        className={`backdrop backdrop--${childrenPosition}`}
        data-testid="backdrop"
      >
        {
          <Dialog {...{ backDrop, childrenPosition, ...rest }}>
            {children}
          </Dialog>
        }
      </div>
    ) : (
      <Dialog {...{ backDrop, childrenPosition, ...rest }}>{children}</Dialog>
    )}
  </Portal>
);

export default ModalContainer;
