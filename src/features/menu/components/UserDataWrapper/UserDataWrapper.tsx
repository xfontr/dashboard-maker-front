import useUserData from "../../../users/store/userDataSlice/userData.hook";
import UserMiniCard from "../UserMiniCard/UserMiniCard";

type UserMiniCardWrapperProps = {
  showOnlyIcon: boolean;
  isMobile?: boolean;
  globalAction?: () => void;
};

export const UserDataWrapper = (props: UserMiniCardWrapperProps) => {
  const {
    userData: { email, role },
  } = useUserData();

  return <UserMiniCard {...props} identifier={email} role={role!} />;
};

export default UserDataWrapper;
