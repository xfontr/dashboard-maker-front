import { PropsWithChildren } from "react";
import { GlassBox } from "../../../../common/components/Box/Box";
import "./Layout.scss";

const Layout = ({ children }: PropsWithChildren) => (
  <main className="main">
    <header className="main__company">
      <img
        src="./img/mock-logo.png"
        alt="Company logo"
        height={200}
        width={200}
      />
    </header>

    <GlassBox className="main__content">{children}</GlassBox>
  </main>
);

export default Layout;
