import MediaQuery from "../../../../common/components/MediaQuery/MediaQuery";
import Sideboard from "../Sideboard/Sideboard";

const Menu = (): JSX.Element => (
  <>
    <MediaQuery screenSize="smallMedium" hasToMatch={true}>
      Burger menu
    </MediaQuery>
    <MediaQuery screenSize="smallMedium">
      <Sideboard />
    </MediaQuery>
  </>
);

export default Menu;
