import useLogOut from "../../../users/hooks/useLogOut";
import Button from "../../../../common/components/Button/Button";
import "./Sideboard.scss";

const Sideboard = (): JSX.Element => {
  const logOut = useLogOut();

  return (
    <aside className="sideboard">
      <ul>
        <li>
          <Button onClick={logOut}>Log out</Button>
        </li>
      </ul>
    </aside>
  );
};

export default Sideboard;
