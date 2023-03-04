import { useState } from "react";
import Tab from "./Tab";

const Tabs = ({
  children,
}: {
  children: ReturnType<typeof Tab>[];
}): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const setTab = (tab: number) => () => {
    setSelectedTab(tab);
  };

  return (
    <section className="tabs">
      <header className="options">
        <ul>
          {children.map(({ name }, index) => (
            <li onClick={setTab(index)} key={name}>
              {name}
            </li>
          ))}
        </ul>
      </header>
      <main className="content">{children[selectedTab].children}</main>
    </section>
  );
};

export default Tabs;
