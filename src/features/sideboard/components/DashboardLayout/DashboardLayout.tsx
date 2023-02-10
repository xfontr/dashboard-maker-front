import { HTMLAttributes, ReactNode } from "react";
import Page from "../../../../common/components/Page/Page";
import setProps from "../../../../common/utils/setProps";
import Sideboard from "../Sideboard/Sideboard";
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
}: DashboardLayoutProps): JSX.Element => {
  return (
    <main className="board-main">
      <Sideboard />
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
};

export default DashboardLayout;
