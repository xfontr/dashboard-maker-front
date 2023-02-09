import useLogOut from "../../../users/hooks/useLogOut";
import "./Sideboard.scss";
import MenuItem from "../MenuItem/MenuItem";
import { CloseIcon } from "../../../../common/components/Icon/Icon";
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
      {showOnlyIcon || (
        <header className="sideboard__company">
          <h3>{COMPANY.name}</h3>
        </header>
      )}
      <ul className="sideboard__items">
        <MenuItem
          label="Overview"
          onClick={() => navigate(PATHS.home)}
          Icon={CloseIcon}
          {...{ showOnlyIcon }}
        />
        <MenuItem
          label="Contract/Expand"
          onClick={() => setIsExpanded((current) => !current)}
          Icon={CloseIcon}
          aria-label={showOnlyIcon ? "Expand menu" : "Contract menu"}
          {...{ showOnlyIcon }}
        />
      </ul>

      <footer>
        <UserMiniCard {...{ showOnlyIcon }} />
      </footer>
    </aside>
  );
};

export default Sideboard;
