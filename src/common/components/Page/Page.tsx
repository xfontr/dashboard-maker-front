import { HTMLProps, ReactNode } from "react";
import setProps from "../../utils/setProps";
import "./Page.scss";

export interface PageProps extends HTMLProps<HTMLDivElement> {
  heading: string;
  subheading?: string;
  children?: ReactNode;
}

const Page = ({
  heading,
  subheading,
  children,
  ...rest
}: PageProps): JSX.Element => (
  <>
    <header {...setProps(rest, "className", "page-header")}>
      <h1 className="page-header__title">{heading}</h1>
      {subheading && (
        <span className="page-header__subtitle">{subheading}</span>
      )}
    </header>
    {children && children}
  </>
);

export default Page;
