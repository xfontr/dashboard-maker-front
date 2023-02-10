import { HTMLProps, ReactNode } from "react";
import setProps from "../../utils/setProps";
import "./Page.scss";

export interface PageProps extends HTMLProps<HTMLDivElement> {
  heading?: string;
  subheading?: string;
  children?: ReactNode;
  hasBreadcrumbs?: boolean;
}

const Page = ({
  heading,
  subheading,
  children,
  hasBreadcrumbs = false,
  ...rest
}: PageProps): JSX.Element => (
  <>
    <header {...setProps(rest, "className", "page-header")}>
      {hasBreadcrumbs && <p>Breadcrumbs</p>}
      {/* TODO: Test conditional heading */}
      {heading && <h1 className="page-header__title">{heading}</h1>}
      {subheading && (
        <span className="page-header__subtitle">{subheading}</span>
      )}
    </header>
    {children && children}
  </>
);

export default Page;
