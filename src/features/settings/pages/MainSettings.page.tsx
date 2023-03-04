import Tab from "../../../common/components/Tabs/Tab/Tab";
import Tabs from "../../../common/components/Tabs/Tabs";
import DataSet from "../../../common/components/DataSet/DataSet";
import useUser from "../../../common/hooks/useUser";
import userDataSets from "../../../common/assets/userDataSets.json";

const MainSettingsPage = (): JSX.Element => {
  const { getUserDataSet } = useUser();

  return (
    <>
      <Tabs variant="border">
        {Tab(
          "Profile",
          <>
            {Object.keys(userDataSets).map((dataSet) => {
              const data = getUserDataSet(dataSet as keyof typeof userDataSets);
              return <DataSet dataset={data} />;
            })}
          </>
        )}
        {Tab("Security", <></>)}
      </Tabs>
    </>
  );
};

export default MainSettingsPage;
