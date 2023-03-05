import Tab from "../../../common/components/Tabs/Tab/Tab";
import Tabs from "../../../common/components/Tabs/Tabs";
import UserProfile from "../components/UserProfile/UserProfile";

const MainSettingsPage = (): JSX.Element => {
  return (
    <>
      <Tabs variant="border">
        {Tab("Profile", <UserProfile />)}
        {Tab("Security", <></>)}
      </Tabs>
    </>
  );
};

export default MainSettingsPage;
