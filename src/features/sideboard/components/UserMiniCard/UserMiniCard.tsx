import { GlassBox } from "../../../../common/components/Box/Box";
import useLogOut from "../../../users/hooks/useLogOut";
import useUserAuth from "../../../users/store/userAuth.hook";
import "./UserMiniCard.scss";

type UserMiniCardProps = {
  showOnlyIcon: boolean;
};

const UserMiniCard = ({ showOnlyIcon }: UserMiniCardProps) => {
  const logOut = useLogOut();
  const {
    userAuth: { email, role },
  } = useUserAuth();

  const UserProfile = (
    <img
      src="./img/default-user-profile.png"
      alt="User profile"
      height={45}
      width={45}
    />
  );

  return showOnlyIcon ? (
    <>{UserProfile}</>
  ) : (
    <article className="user-card">
      <GlassBox className="box--spacious">
        <div className="user-card__info">
          {UserProfile}

          <ul className="user-card__details">
            <li className="user-card__detail">{email}</li>
            <li className="user-card__detail">{role}</li>
          </ul>
        </div>

        <ul className="user-card__options">
          <li className="user-card__option" onClick={logOut}>
            Log out
          </li>
          <li className="user-card__option">Settings</li>
        </ul>
      </GlassBox>
    </article>
  );
};

export default UserMiniCard;
