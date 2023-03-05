import { HTMLAttributes, ReactNode } from "react";
import {
  FaRegTimesCircle,
  FaRegCheckCircle,
  FaRegSurprise,
  FaSpinner,
  FaSignOutAlt,
  FaUserEdit,
} from "react-icons/fa";
import { AiOutlineSetting } from "react-icons/ai";
import { CgMenuGridR } from "react-icons/cg";
import { MdDashboard } from "react-icons/md";
import setProps from "../../utils/setProps";
import "./Icon.scss";

const baseClass = "icon";

const variants = {
  spin: `${baseClass}--spin`,
};

export interface IconProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const Icon = ({ children, ...rest }: IconProps): JSX.Element => (
  <i {...setProps(rest, "className", "icon-wrap")}>{children}</i>
);

export const CloseIcon = ({ children, ...rest }: IconProps): JSX.Element => (
  <Icon {...rest}>
    <FaRegTimesCircle className={baseClass} />
    {children}
  </Icon>
);

export const SuccessIcon = ({ children, ...rest }: IconProps): JSX.Element => (
  <Icon {...rest}>
    <FaRegCheckCircle className={baseClass} />
    {children}
  </Icon>
);

export const ErrorIcon = ({ children, ...rest }: IconProps): JSX.Element => (
  <Icon {...rest}>
    <FaRegSurprise className={baseClass} />
    {children}
  </Icon>
);

export const SpinnerIcon = ({ children, ...rest }: IconProps): JSX.Element => (
  <Icon {...rest}>
    <FaSpinner className={`${baseClass} ${variants.spin}`} />
    {children}
  </Icon>
);

export const LogOutIcon = ({ children, ...rest }: IconProps): JSX.Element => (
  <Icon {...rest}>
    <FaSignOutAlt className={baseClass} />
    {children}
  </Icon>
);

export const SettingsIcon = ({ children, ...rest }: IconProps): JSX.Element => (
  <Icon {...rest}>
    <AiOutlineSetting className={baseClass} />
    {children}
  </Icon>
);

export const MenuIcon = ({ children, ...rest }: IconProps): JSX.Element => (
  <Icon {...rest}>
    <CgMenuGridR className={baseClass} />
    {children}
  </Icon>
);

export const DashboardIcon = ({
  children,
  ...rest
}: IconProps): JSX.Element => (
  <Icon {...rest}>
    <MdDashboard className={baseClass} />
    {children}
  </Icon>
);

export const EditIcon = ({ children, ...rest }: IconProps): JSX.Element => (
  <Icon {...rest}>
    <FaUserEdit className={baseClass} />
    {children}
  </Icon>
);

export default Icon;
