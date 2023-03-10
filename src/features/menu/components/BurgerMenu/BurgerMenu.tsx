import { useState } from "react";
import concatIfTrue from "../../../../common/utils/concatIfTrue";
import COMPANY from "../../../../config/company";
import { MenuItems } from "../MenuItems/MenuItems";
import UserDataWrapper from "../UserDataWrapper/UserDataWrapper";
import "./BurgerMenu.scss";

const BurgerMenu = (): JSX.Element => {
  const [isMenuVisible, setVisibility] = useState<boolean>(false);

  const toggleVisibility = (): void => {
    setVisibility((current) => !current);
  };

  return (
    <nav className={concatIfTrue("burger", "burger--open", isMenuVisible)}>
      <header className="burger__header">
        <h3 className="burger__company">{COMPANY.name}</h3>
        <button
          className="burger__icon"
          onClick={toggleVisibility}
          title={isMenuVisible ? "Close burger menu" : "Open burger menu"}
        >
          <div
            className={concatIfTrue(
              "burger__line",
              "burger__line--crossed",
              isMenuVisible
            )}
          ></div>
        </button>
      </header>

      {isMenuVisible && (
        <div className="burger__full-menu">
          <MenuItems showOnlyIcon={false} />
          <UserDataWrapper showOnlyIcon={false} isMobile={true} />
        </div>
      )}
    </nav>
  );
};

export default BurgerMenu;
