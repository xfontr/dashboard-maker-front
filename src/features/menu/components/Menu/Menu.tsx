import MediaQuery from "../../../../common/components/MediaQuery/MediaQuery";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Sideboard from "../Sideboard/Sideboard";

const Menu = (): JSX.Element => (
  <>
    <MediaQuery screenSize="smallMedium" hasToMatch={true}>
      <BurgerMenu />
    </MediaQuery>
    <MediaQuery screenSize="smallMedium">
      <Sideboard />
    </MediaQuery>
  </>
);

export default Menu;
