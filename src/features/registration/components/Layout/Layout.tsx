import { PropsWithChildren } from "react";
import "./Layout.scss";

const Layout = ({ children }: PropsWithChildren) => (
  <main className="main">
    <div className="company">Company logo</div>
    <div className="content">{children}</div>
  </main>
);

export default Layout;
