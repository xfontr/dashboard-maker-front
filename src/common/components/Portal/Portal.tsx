import { ReactNode } from "react";
import { createPortal } from "react-dom";

const root = document.getElementById("root")!;

type PortalProps = {
  children: ReactNode;
  parent?: HTMLElement;
};

const Portal = ({ children, parent = root }: PortalProps): JSX.Element =>
  createPortal(children, parent);

export default Portal;
