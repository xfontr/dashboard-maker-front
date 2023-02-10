import { Link, useLocation } from "react-router-dom";
import PATHS from "../../../config/paths";

const Breadcrumbs = (): JSX.Element => {
  const { pathname } = useLocation();
  const userPaths = pathname.split("/");
  userPaths.splice(0, 1);

  return (
    <div className="breadcrumbs">
      <Link key={"home"} to={PATHS.root}>
        home
      </Link>

      {userPaths.map((path, index) =>
        index === userPaths.length - 1 ? (
          ` / ${path}`
        ) : (
          <Link key={path} to={`/${path}`}>
            {` / ${path}`}
          </Link>
        )
      )}
    </div>
  );
};

export default Breadcrumbs;
