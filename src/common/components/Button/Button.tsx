import "./Button.scss";
import { ReactNode } from "react";
import setProps from "../../utils/setProps";
import { ButtonHTMLAttributes } from "react";

const baseClass = "button";

/** Internal variants */
const variants = {
  outline: `${baseClass}--outline`,
  animation: `${baseClass}__background`,
  glassy: `${baseClass}--glass`,
};

/** External variants */
const buttonVariants = {
  tiny: `${baseClass}--tiny`,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  variant?: keyof typeof buttonVariants;
}

export const Button = ({
  children,
  variant,
  ...rest
}: ButtonProps): JSX.Element => (
  <button
    {...setProps(
      rest,
      "className",
      variant ? `${baseClass} ${buttonVariants[variant]}` : baseClass
    )}
  >
    {children}
  </button>
);

export const OutlineButton = ({
  children,
  variant,
  ...rest
}: ButtonProps): JSX.Element => (
  <Button {...setProps(rest, "className", variants.outline)} {...{ variant }}>
    {children}
  </Button>
);

export const AnimatedButton = ({ children, variant, ...rest }: ButtonProps) => (
  <Button {...rest} {...{ variant }}>
    {children}
    <div className={`${baseClass} ${variants.animation}`}>{children}</div>
  </Button>
);

export const GlassButton = ({ children, variant, ...rest }: ButtonProps) => (
  <Button {...setProps(rest, "className", variants.glassy)} {...{ variant }}>
    {children}
  </Button>
);

export default Button;
