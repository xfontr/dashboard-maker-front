import { Navigate, Outlet } from "react-router-dom";
import PATHS from "../../../config/paths";

interface RoutesProtectorProps {
  condition: boolean;
  rejectPath?: string;
}

const RoutesProtector = ({
  condition,
  rejectPath = PATHS.root,
}: RoutesProtectorProps): JSX.Element =>
  condition ? <Outlet /> : <Navigate to={rejectPath} />;

export default RoutesProtector;
