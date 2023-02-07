import { PropsWithChildren } from "react";
import useLogOut from "../../../features/users/hooks/useLogOut";
import Button from "../Button/Button";
import "./DashboardLayout.scss";

const DashboardLayout = ({ children }: PropsWithChildren): JSX.Element => {
  const logOut = useLogOut();

  return (
    <main className="board-main">
      <aside className="sideboard">
        <Button onClick={logOut}>Log out</Button>
      </aside>

      <div className="content">{children}</div>
    </main>
  );
};

export default DashboardLayout;
