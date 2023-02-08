import useLogOut from "../../../users/hooks/useLogOut";
import "./Sideboard.scss";
import MenuItem from "../MenuItem/MenuItem";
import { CloseIcon } from "../../../../common/components/Icon/Icon";
import { useNavigate } from "react-router-dom";
import PATHS from "../../../../config/paths";
import { useState } from "react";

const Sideboard = (): JSX.Element => {
  const [showOnlyIcon, setIsExpanded] = useState<boolean>(false);

  const logOut = useLogOut();
  const navigate = useNavigate();

  return (
    <aside
      className={`sideboard${showOnlyIcon ? " sideboard--contracted" : ""}`}
      data-testid="sideboard"
    >
      <ul className="sideboard__items">
        <MenuItem
          label="Home"
          onClick={() => navigate(PATHS.home)}
          Icon={CloseIcon}
          {...{ showOnlyIcon }}
        />
        <MenuItem
          label="Log out"
          onClick={logOut}
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
    </aside>
  );
};

export default Sideboard;
