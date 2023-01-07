import { PropsWithChildren } from "react";
import "./Layout.scss";

const Layout = ({ children }: PropsWithChildren) => (
  <main className="main">
    <div className="company">
      <img src="" alt="Company logo" />
    </div>
    <div className="content">{children}</div>
  </main>
);

export default Layout;
