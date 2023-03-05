import userDataSets from "../../../../common/assets/userDataSets.json";
import useUser from "../../../../common/hooks/useUser";
import UserProfileField from "../UserProfileField/UserProfileField";
import AvailableDataSets from "../../types/AvailableDataSets";
import "./UserProfile.scss";

type UserProfileProps = {
  canEdit?: boolean;
};

const baseUserProfile =
  (userProfileFields: Record<string, string[]>) =>
  ({ canEdit = true }: UserProfileProps): JSX.Element => {
    const { getUserDataSet } = useUser();

    return (
      <div className="user-profile">
        {Object.keys(userProfileFields).map((dataSet) => {
          const data = getUserDataSet(dataSet as AvailableDataSets);
          return (
            <UserProfileField
              {...{ data, canEdit }}
              dataSet={dataSet as AvailableDataSets}
            />
          );
        })}
      </div>
    );
  };

const UserProfile = baseUserProfile(userDataSets);

export default UserProfile;
