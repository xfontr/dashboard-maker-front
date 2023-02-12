import { ReactNode } from "react";
import DefaultMediaQuery from "react-responsive";
import BREAKPOINTS from "../../../config/breakpoints";

const variants = { ...BREAKPOINTS };

type MediaQueryProps = {
  children: ReactNode;
  screenSize: keyof typeof variants;
  /**
   * If set to true, it will render from 0 to the stated breakpoint, and unmount
   * once it hits the actual breakpoint
   */
  hasToMatch?: boolean;
};

/**
 * This function takes the MediaQuery component from the library
 * 'react-responsive' and adds an extra customized layer with the app actual
 * breakpoints.
 *
 * @example
 *   const Example = (): JSX.Element => (
 *     <>
 *       <MediaQuery screenSize="smallMedium" hasToMatch={true}>
 *         Renders if screenSize is less than smallMedium. Unmounts if more
 *       </MediaQuery>
 *       <MediaQuery screenSize="smallMedium">
 *         Renders if screenSize is smallMedium or more
 *       </MediaQuery>
 *     </>
 *   );
 */

const MediaQuery = ({
  children,
  screenSize,
  hasToMatch = false,
}: MediaQueryProps) => (
  <DefaultMediaQuery minWidth={variants[screenSize]}>
    {!hasToMatch ? children : (matches) => (matches ? <></> : <>{children}</>)}
  </DefaultMediaQuery>
);

export default MediaQuery;
