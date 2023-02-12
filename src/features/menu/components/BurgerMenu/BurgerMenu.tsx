import concatIfTrue from "../../../../common/utils/concatIfTrue";
import useBurgerMenu from "../../hooks/useBurgerMenu";
import { MenuItems } from "../MenuItems/MenuItems";
import { UserMiniCardWrapper } from "../UserMiniCard/UserMiniCard";
import "./BurgerMenu.scss";

const BurgerMenu = (): JSX.Element => {
  const { isMenuVisible, toggleVisibility } = useBurgerMenu();

  return (
    <nav className={concatIfTrue("burger", "burger--open", isMenuVisible)}>
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

      {isMenuVisible && (
        <>
          <MenuItems showOnlyIcon={false} />
          <UserMiniCardWrapper showOnlyIcon={false} isMobile={true} />
        </>
      )}
    </nav>
  );
};

export default BurgerMenu;
