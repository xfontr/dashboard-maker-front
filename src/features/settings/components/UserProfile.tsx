import DataSet from "../../../common/components/DataSet/DataSet";
import userDataSets from "../../../common/assets/userDataSets.json";
import useUser from "../../../common/hooks/useUser";
import "./UserProfile.scss";
import Box from "../../../common/components/Box/Box";
import capitalize from "../../../common/utils/capitalize";

const UserProfile = (): JSX.Element => {
  const { getUserDataSet } = useUser();

  return (
    <div className="user-profile">
      {Object.keys(userDataSets).map((dataSet) => {
        const data = getUserDataSet(dataSet as keyof typeof userDataSets);
        return (
          <Box className="user-profile__field" key={dataSet}>
            <h3 className="user-profile__field-heading">
              {capitalize(dataSet)}
            </h3>
            <DataSet dataset={data} />
          </Box>
        );
      })}
    </div>
  );
};

export default UserProfile;
