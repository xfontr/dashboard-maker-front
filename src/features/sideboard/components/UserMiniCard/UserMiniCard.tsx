import { boxVariants, GlassBox } from "../../../../common/components/Box/Box";
import { GlassButton } from "../../../../common/components/Button/Button";
import {
  LogOutIcon,
  SettingsIcon,
} from "../../../../common/components/Icon/Icon";
import useLogOut from "../../../users/hooks/useLogOut";
import useUserAuth from "../../../users/store/userAuth.hook";
import "./UserMiniCard.scss";

type UserMiniCardProps = {
  showOnlyIcon: boolean;
};

const UserMiniCard = ({ showOnlyIcon }: UserMiniCardProps) => {
  const mockUserName = "John Doe";
  const logOut = useLogOut();
  const {
    userAuth: { role },
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
      <GlassBox className={boxVariants.small}>
        <div className="user-card__info">
          {UserProfile}

          <ul className="user-card__details">
            <li className="user-card__identifier">{mockUserName}</li>
            <li className="user-card__role">{role}</li>
          </ul>
        </div>

        <ul className="user-card__options">
          <li className="user-card__option" onClick={logOut}>
            <GlassButton variant="tiny">
              Log out
              <LogOutIcon />
            </GlassButton>
          </li>
          <li className="user-card__option">
            <GlassButton variant="tiny">
              Settings
              <SettingsIcon />
            </GlassButton>
          </li>
        </ul>
      </GlassBox>
    </article>
  );
};

export default UserMiniCard;
