import useUserAuth from "../../../users/store/userAuth.hook";
import UserMiniCard from "../UserMiniCard/UserMiniCard";

type UserMiniCardWrapperProps = {
  showOnlyIcon: boolean;
  isMobile?: boolean;
};

export const UserDataWrapper = (props: UserMiniCardWrapperProps) => {
  const {
    userAuth: { email, role },
  } = useUserAuth();

  return <UserMiniCard {...props} identifier={email} role={role} />;
};

export default UserDataWrapper;
