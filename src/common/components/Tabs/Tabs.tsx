import { useState } from "react";
import concatIfTrue from "../../utils/concatIfTrue";
import { OutlineButton } from "../Button/Button";
import Tab from "./Tab/Tab";
import "./Tabs.scss";

const baseClass = "tab";

const variants = {
  background: `${baseClass}--background`,
  border: `${baseClass}--border`,
};

type TabsProps = {
  children: ReturnType<typeof Tab>[];
  variant?: keyof typeof variants;
};

const Tabs = ({ children, variant }: TabsProps): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const setTab = (tab: number) => () => {
    setSelectedTab(tab);
  };

  return (
    <div className="tabs">
      <nav className="options">
        <ul className="options__list">
          {children.map(({ name }, index) => (
            <li key={name}>
              <OutlineButton
                className="button--tiny-wide"
                variant={selectedTab === index ? "tinyActive" : "tiny"}
                onClick={setTab(index)}
              >
                {name}
              </OutlineButton>
            </li>
          ))}
        </ul>
      </nav>
      <section
        className={concatIfTrue(baseClass, variants[variant!], !!variant)}
        data-testid="tab__content"
      >
        {children[selectedTab].children}
      </section>
    </div>
  );
};

export default Tabs;
