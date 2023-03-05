import Box from "../../../../common/components/Box/Box";
import DataSet from "../../../../common/components/DataSet/DataSet";
import { EditIcon } from "../../../../common/components/Icon/Icon";
import capitalize from "../../../../common/utils/capitalize";
import DataUnit from "../../../../common/types/DataUnit";
import AvailableDataSets from "../../types/AvailableDataSets";
import "./UserProfileField.scss";
import useToggle from "../../../../common/hooks/useToggle";

type UserProfileFieldProps = {
  dataSet: AvailableDataSets;
  data: DataUnit[];
  canEdit?: boolean;
};

const UserProfileField = ({
  dataSet,
  data,
  canEdit = false,
}: UserProfileFieldProps): JSX.Element => {
  const { isVisible: isEdit, show } = useToggle();

  return (
    <Box className="user-profile__field" key={dataSet}>
      {isEdit ? (
        <>Edit fields</>
      ) : (
        <>
          <header className="user-profile__header">
            <h3 className="user-profile__field-heading">
              {capitalize(dataSet)}
            </h3>
            {canEdit && (
              <button onClick={show}>
                <EditIcon />
              </button>
            )}
          </header>

          <DataSet dataset={data} />
        </>
      )}
    </Box>
  );
};

export default UserProfileField;
