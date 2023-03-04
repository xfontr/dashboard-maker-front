import Tab from "../../../common/components/Tabs/Tab/Tab";
import Tabs from "../../../common/components/Tabs/Tabs";

const MainSettingsPage = (): JSX.Element => (
  <>
    <Tabs variant="border">
      {Tab("Profile", <>Hello</>)}
      {Tab("Security", <>Bye</>)}
    </Tabs>
  </>
);

export default MainSettingsPage;
