import Tab from "../../../common/components/Tabs/Tab";
import Tabs from "../../../common/components/Tabs/Tabs";

const MainSettingsPage = (): JSX.Element => (
  <>
    Main settings
    <Tabs>
      {Tab("shit", <>Hello</>)}
      {Tab("death", <>Bye</>)}
    </Tabs>
  </>
);

export default MainSettingsPage;
