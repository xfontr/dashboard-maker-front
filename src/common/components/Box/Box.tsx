import { HTMLAttributes, ReactNode } from "react";
import setProps from "../../utils/setProps";
import "./Box.scss";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Box = ({ children, ...rest }: BoxProps): JSX.Element => (
  <div {...setProps(rest, "className", "box")}>{children}</div>
);

export const GlassBox = ({ children, ...rest }: BoxProps) => (
  <Box {...setProps(rest, "className", "box box--glass")}>{children}</Box>
);

export default Box;
