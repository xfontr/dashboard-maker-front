import { HTMLAttributes, ReactNode } from "react";
import Page from "../../../../common/components/Page/Page";
import setProps from "../../../../common/utils/setProps";
import Menu from "../Menu/Menu";
import "./DashboardLayout.scss";

export interface DashboardLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  heading?: string;
  subheading?: string;
}

const DashboardLayout = ({
  children,
  heading,
  subheading,
  ...rest
}: DashboardLayoutProps): JSX.Element => (
  <main className="board-main">
    <Menu />
    <div {...setProps(rest, "className", "content")}>
      <Page
        className="content__header"
        hasBreadcrumbs={true}
        {...{ heading, subheading }}
      >
        <section className="content__page">{children}</section>
      </Page>
    </div>
  </main>
);

export default DashboardLayout;
