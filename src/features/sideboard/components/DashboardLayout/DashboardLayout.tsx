import { PropsWithChildren } from "react";
import Sideboard from "../Sideboard/Sideboard";
import "./DashboardLayout.scss";

const DashboardLayout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <main className="board-main">
      <Sideboard />
      <div className="content">{children}</div>
    </main>
  );
};

export default DashboardLayout;
