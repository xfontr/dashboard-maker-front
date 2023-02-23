import "./Sideboard.scss";
import { MenuIcon } from "../../../../common/components/Icon/Icon";
import COMPANY from "../../../../config/company";
import { MenuItems } from "../MenuItems/MenuItems";
import concatIfTrue from "../../../../common/utils/concatIfTrue";
import UserDataWrapper from "../UserDataWrapper/UserDataWrapper";
import useToggle from "../../../../common/hooks/useToggle";

const Sideboard = (): JSX.Element => {
  const [showOnlyIcon, toggleSideboard] = useToggle();

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
        <UserDataWrapper {...{ showOnlyIcon }} />
      </footer>
    </aside>
  );
};

export default Sideboard;
