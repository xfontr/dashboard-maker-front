import "./Button.scss";
import { ReactNode } from "react";
import setProps from "../../utils/setProps";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

export const Button = ({ children, ...rest }: ButtonProps): JSX.Element => (
  <button {...setProps(rest, "className", "button")}>{children}</button>
);

export const AnimatedButton = ({ children, ...rest }: ButtonProps) => (
  <Button {...rest}>
    {children}
    <div className="button button__background">{children}</div>
  </Button>
);

export default Button;
