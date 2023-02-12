import "./Sideboard.scss";
import { MenuIcon } from "../../../../common/components/Icon/Icon";
import { useState } from "react";
import COMPANY from "../../../../config/company";
import { UserMiniCardWrapper } from "../UserMiniCard/UserMiniCard";
import { MenuItems } from "../MenuItems/MenuItems";
import concatIfTrue from "../../../../common/utils/concatIfTrue";

const Sideboard = (): JSX.Element => {
  const [showOnlyIcon, setIsExpanded] = useState<boolean>(false);

  // TODO: Consider custom hook, just like for burger. Or opposite, consider no custom hooks

  const toggleSideboard = () => {
    setIsExpanded((current) => !current);
  };

  return (
    <aside
      className={concatIfTrue(
        "sideboard",
        "sideboard--contracted",
        showOnlyIcon
      )}
      data-testid="sideboard"
    >
      <header className="sideboard__company">
        <button
          title={showOnlyIcon ? "Expand menu" : "Contract menu"}
          onClick={toggleSideboard}
        >
          <MenuIcon />
        </button>

        {showOnlyIcon || <h3>{COMPANY.name}</h3>}
      </header>

      <nav>
        <MenuItems {...{ showOnlyIcon }} />
      </nav>

      <footer>
        <UserMiniCardWrapper {...{ showOnlyIcon }} />
      </footer>
    </aside>
  );
};

export default Sideboard;
