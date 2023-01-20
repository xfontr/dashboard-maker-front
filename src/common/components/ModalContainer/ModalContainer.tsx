import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";
import setProps from "../../utils/setProps";
import Portal from "../Portal/Portal";
import "./ModalContainer.scss";

interface ModalContainerProps extends HTMLAttributes<HTMLDialogElement> {
  children: ReactNode;
  childrenPosition?: "top" | "center";
  backDrop?: boolean;
}

const ModalContainer = ({
  children,
  backDrop = false,
  childrenPosition = "center",
  ...rest
}: ModalContainerProps): JSX.Element => {
  const Dialog = ({ children }: PropsWithChildren) => (
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

  return (
    <Portal>
      {backDrop ? (
        <div
          className={`backdrop backdrop--${childrenPosition}`}
          data-testid="backdrop"
        >
          {<Dialog>{children}</Dialog>}
        </div>
      ) : (
        <Dialog>{children}</Dialog>
      )}
    </Portal>
  );
};

export default ModalContainer;
