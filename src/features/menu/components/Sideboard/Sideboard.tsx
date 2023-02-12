import "./Sideboard.scss";
import { MenuIcon } from "../../../../common/components/Icon/Icon";
import { useState } from "react";
import COMPANY from "../../../../config/company";
import { UserMiniCardWrapper } from "../UserMiniCard/UserMiniCard";
import { MenuItems } from "../MenuItems/MenuItems";

const Sideboard = (): JSX.Element => {
  const [showOnlyIcon, setIsExpanded] = useState<boolean>(false);

  return (
    <aside
      className={`sideboard${showOnlyIcon ? " sideboard--contracted" : ""}`}
      data-testid="sideboard"
    >
      <header className="sideboard__company">
        <button
          title={showOnlyIcon ? "Expand menu" : "Contract menu"}
          onClick={() => setIsExpanded((current) => !current)}
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
