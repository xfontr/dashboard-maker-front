import { ReactNode } from "react";
import DefaultMediaQuery from "react-responsive";
import BREAKPOINTS from "../../../config/breakpoints";

const variants = { ...BREAKPOINTS };

type MediaQueryProps = {
  children: ReactNode;
  screenSize: keyof typeof variants;
};

const MediaQuery = ({ children, screenSize }: MediaQueryProps) => (
  <DefaultMediaQuery minWidth={variants[screenSize]}>
    {children}
  </DefaultMediaQuery>
);

export default MediaQuery;
