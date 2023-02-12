import useBurgerMenu from "../../hooks/useBurgerMenu";
import { MenuItems } from "../MenuItems/MenuItems";
import "./BurgerMenu.scss";

const BurgerMenu = (): JSX.Element => {
  const { isMenuVisible, toggleVisibility } = useBurgerMenu();

  return (
    <nav className={`burger${isMenuVisible ? " burger--open" : ""}`}>
      <button
        className="burger__icon"
        onClick={toggleVisibility}
        title={isMenuVisible ? "Close burger menu" : "Open burger menu"}
      >
        <div
          className={`burger__line${
            isMenuVisible ? " burger__line--crossed" : ""
          }`}
        ></div>
      </button>

      {isMenuVisible && <MenuItems showOnlyIcon={false} />}
    </nav>
  );
};

export default BurgerMenu;
