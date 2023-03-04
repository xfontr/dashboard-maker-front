import { ReactNode } from "react";
import "./Tab.scss";

export const tabDefaultName = "Option #";

const Tab = (name: string, children: ReactNode, title?: string) => ({
  name: name || tabDefaultName,
  children: (
    <>
      <h3 className="tab__header">{title ?? name}</h3>
      <div className="tab__content">{children}</div>
    </>
  ),
});

export default Tab;
