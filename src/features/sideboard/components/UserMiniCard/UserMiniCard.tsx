import { boxVariants, GlassBox } from "../../../../common/components/Box/Box";
import { GlassButton } from "../../../../common/components/Button/Button";
import {
  LogOutIcon,
  SettingsIcon,
} from "../../../../common/components/Icon/Icon";
import UserRoles from "../../../../common/types/UserRoles";
import useLogOut from "../../../users/hooks/useLogOut";
import "./UserMiniCard.scss";

type UserMiniCardProps = {
  identifier: string;
  role: UserRoles;
  showOnlyIcon: boolean;
  profilePicture?: string;
};

const UserMiniCard = ({
  identifier,
  role,
  showOnlyIcon,
  profilePicture,
}: UserMiniCardProps) => {
  const logOut = useLogOut();

  const UserProfile = (
    <img
      className="user-card__profile"
      src={profilePicture ?? "./img/default-user-profile.png"}
      aria-label="User settings"
      title="Open user settings"
      alt="User profile"
      height={showOnlyIcon ? 25 : 45}
      width={showOnlyIcon ? 25 : 45}
    />
  );

  return showOnlyIcon ? (
    <div className="user-card">{UserProfile}</div>
  ) : (
    <article className="user-card">
      <GlassBox className={boxVariants.small}>
        <div className="user-card__info">
          {UserProfile}

          <div className="user-card__details">
            <h3 className="user-card__identifier" title="User name">
              {identifier}
            </h3>
            <span className="user-card__role" title="User role">
              {role}
            </span>
          </div>
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
