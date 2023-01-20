import { HTMLAttributes, ReactNode } from "react";
import {
  FaRegTimesCircle,
  FaRegCheckCircle,
  FaRegSurprise,
  FaSpinner,
} from "react-icons/fa";
import "./Icon.scss";

export interface IconProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const Icon = ({ children, ...rest }: IconProps): JSX.Element => (
  <i {...rest}>{children}</i>
);

export const CloseIcon = ({ children, ...rest }: IconProps): JSX.Element => (
  <Icon {...rest}>
    <FaRegTimesCircle className="icon" />
    {children}
  </Icon>
);

export const SuccessIcon = ({ children, ...rest }: IconProps): JSX.Element => (
  <Icon {...rest}>
    <FaRegCheckCircle className="icon" />
    {children}
  </Icon>
);

export const ErrorIcon = ({ children, ...rest }: IconProps): JSX.Element => (
  <Icon {...rest}>
    <FaRegSurprise className="icon" />
    {children}
  </Icon>
);

export const SpinnerIcon = ({ children, ...rest }: IconProps): JSX.Element => (
  <Icon {...rest}>
    <FaSpinner className="icon icon--spin" />
    {children}
  </Icon>
);

export default Icon;
