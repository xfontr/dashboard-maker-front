import concatIfTrue from "../../../../common/utils/concatIfTrue";
import COMPANY from "../../../../config/company";
import useBurgerMenu from "../../hooks/useBurgerMenu";
import { MenuItems } from "../MenuItems/MenuItems";
import { UserMiniCardWrapper } from "../UserMiniCard/UserMiniCard";
import "./BurgerMenu.scss";

const BurgerMenu = (): JSX.Element => {
  const { isMenuVisible, toggleVisibility } = useBurgerMenu();

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
          <UserMiniCardWrapper showOnlyIcon={false} isMobile={true} />
        </div>
      )}
    </nav>
  );
};

export default BurgerMenu;
