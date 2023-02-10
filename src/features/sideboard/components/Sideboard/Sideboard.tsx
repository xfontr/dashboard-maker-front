import "./Sideboard.scss";
import MenuItem from "../MenuItem/MenuItem";
import { CloseIcon, MenuIcon } from "../../../../common/components/Icon/Icon";
import { useNavigate } from "react-router-dom";
import PATHS from "../../../../config/paths";
import { useState } from "react";
import COMPANY from "../../../../config/company";
import UserMiniCard from "../UserMiniCard/UserMiniCard";

const Sideboard = (): JSX.Element => {
  const [showOnlyIcon, setIsExpanded] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <aside
      className={`sideboard${showOnlyIcon ? " sideboard--contracted" : ""}`}
      data-testid="sideboard"
    >
      {/* TODO: Test this case */}
      <header className="sideboard__company">
        <button
          title={showOnlyIcon ? "Expand menu" : "Contract menu"}
          onClick={() => setIsExpanded((current) => !current)}
        >
          <MenuIcon />
        </button>

        {showOnlyIcon || <h3>{COMPANY.name}</h3>}
      </header>

      <ul className="sideboard__items">
        <MenuItem
          label="Overview"
          onClick={() => navigate(PATHS.home)}
          Icon={CloseIcon}
          {...{ showOnlyIcon }}
        />
      </ul>
      <footer>
        <UserMiniCard {...{ showOnlyIcon }} identifier="John Doe" role="user" />
      </footer>
    </aside>
  );
};

export default Sideboard;
