import { HTMLAttributes, ReactNode } from "react";
import setProps from "../../utils/setProps";
import "./Box.scss";

const baseClass = "box";

/** Internal variants */
const variants = {
  glassy: `${baseClass}--glass`,
};

/** External variants */
export const boxVariants = {
  small: `${baseClass}--spacious`,
};

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Box = ({ children, ...rest }: BoxProps): JSX.Element => (
  <div {...setProps(rest, "className", baseClass)}>{children}</div>
);

export const GlassBox = ({ children, ...rest }: BoxProps) => (
  <Box {...setProps(rest, "className", variants.glassy)}>{children}</Box>
);

export default Box;
